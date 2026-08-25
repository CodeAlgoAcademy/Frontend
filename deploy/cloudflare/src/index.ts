import { Container, getContainer } from "@cloudflare/containers";

/**
 * Router in front of the Next.js container.
 *
 * Thinner than the Backend Worker on purpose. Next is stateless here - no
 * server sessions, no websockets, no in-memory cache anyone reads twice - so
 * nothing has to be pinned for correctness, and requests are spread over
 * INSTANCES containers.
 *
 * This used to send every request to getContainer(binding, "main"). That is one
 * Durable Object, so it is one container, and raising max_instances in
 * wrangler.jsonc on its own would have changed nothing at all - the extra
 * instances would exist and never be addressed. The instance id is what picks
 * the container, not the limit.
 */

export interface Env {
  WEB_CONTAINER: DurableObjectNamespace<WebContainer>;
  [key: string]: unknown;
}

const CONTAINER_PORT = 3000;

/**
 * How many containers to spread requests over. Must be <= max_instances in
 * wrangler.jsonc; anything above it just queues on containers that will never
 * be allowed to start.
 */
const INSTANCES = 3;

/** Instance ids. Also what the keep-warm cron walks, so none of them is cold. */
const INSTANCE_IDS = Array.from({ length: INSTANCES }, (_, i) => `web-${i}`);

/** Whatever the installed @cloudflare/containers expects as its ctx argument. */
type ContainerCtx = ConstructorParameters<typeof Container>[0];

/**
 * Runtime config forwarded into the Node process.
 *
 * Deliberately short. NEXT_PUBLIC_* values are compiled into the client bundle
 * by `next build` and cannot be set from here - putting NEXT_PUBLIC_API_URL in
 * this list would look like it worked and change nothing. Those live in
 * .env.production at build time; see the Dockerfile.
 */
const PASSTHROUGH_KEYS = ["NODE_ENV", "URL_GAME"] as const;

function nodeEnv(env: Env): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of PASSTHROUGH_KEYS) {
    const value = env[key];
    if (typeof value === "string" && value.length > 0) {
      out[key] = value;
    }
  }
  return out;
}

export class WebContainer extends Container<Env> {
  defaultPort = CONTAINER_PORT;
  // The */5 cron keeps every instance under this, so in practice none of them
  // sleeps. The margin is there so one missed cron does not cost a real user a
  // cold start.
  sleepAfter = "20m";

  constructor(ctx: ContainerCtx, env: Env) {
    super(ctx, env);
    this.envVars = nodeEnv(env);
  }

  override onStart() {
    console.log("web container started");
  }

  override onStop(params: { exitCode: number; reason: string }) {
    console.log("web container stopped", params.exitCode, params.reason);
  }

  override onError(error: unknown) {
    console.error("web container error", error);
    return new Response("upstream error", { status: 502 });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Edge-level liveness. Answers without waking the container, so an uptime
    // check pointed here does not itself keep the thing warm and bill you.
    if (url.pathname === "/__edge/ping") {
      return new Response("pong", { status: 200 });
    }

    // Random rather than round robin: there is no shared counter to keep at
    // the edge, and with a handful of instances the difference does not show.
    // The ids are written out here rather than left to getRandom(), which
    // names them "instance-N" internally - the keep-warm cron below has to
    // address the same objects, and that is not a detail to infer from a
    // library's implementation.
    const id = INSTANCE_IDS[Math.floor(Math.random() * INSTANCE_IDS.length)];
    return getContainer(env.WEB_CONTAINER, id).fetch(request);
  },

  /** Keep-warm. No jobs - Next has nothing scheduled. */
  async scheduled(
    _event: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    // Every instance, not just the first. getRandom() will hand a real user
    // any of them, so warming one would leave the other two to cold start in
    // front of whoever drew them.
    ctx.waitUntil(
      // allSettled, not all: one instance that will not come up must not stop
      // the other two being warmed, and it must not disappear into a single
      // rejected promise either.
      Promise.allSettled(
        INSTANCE_IDS.map(async (id) => {
          const container = getContainer(env.WEB_CONTAINER, id);
          // "/" rather than a dedicated endpoint: it exercises the real render
          // path, so a container that booted but cannot serve a page shows up
          // in the cron logs instead of at the next user.
          const res = await container.fetch(
            new Request("https://container/", { headers: { "x-warmup": "1" } }),
          );
          // Drain so the connection closes cleanly.
          await res.text();
          if (res.status >= 500) {
            console.error(`warmup ${id} got ${res.status}`);
          }
        }),
      ).then((results) => {
        results.forEach((result, i) => {
          if (result.status === "rejected") {
            console.error(`warmup ${INSTANCE_IDS[i]} failed`, result.reason);
          }
        });
      }),
    );
  },
};
