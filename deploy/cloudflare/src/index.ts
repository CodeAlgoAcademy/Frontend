import { Container, getContainer } from "@cloudflare/containers";

/**
 * Router in front of the Next.js container.
 *
 * Thinner than the Backend Worker on purpose. Next is stateless here - no
 * server sessions, no websockets, no in-memory cache anyone reads twice - so
 * this does not have to pin anything for correctness. It pins to one instance
 * anyway because max_instances is 1, and the two should agree.
 */

export interface Env {
  WEB_CONTAINER: DurableObjectNamespace<WebContainer>;
  [key: string]: unknown;
}

const CONTAINER_PORT = 3000;

const INSTANCE = "main";

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
  // The */5 cron keeps it under this, so in practice it never sleeps. The
  // margin is there so one missed cron does not cost a real user a cold start.
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

    return getContainer(env.WEB_CONTAINER, INSTANCE).fetch(request);
  },

  /** Keep-warm. No jobs - Next has nothing scheduled. */
  async scheduled(
    _event: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    const container = getContainer(env.WEB_CONTAINER, INSTANCE);

    ctx.waitUntil(
      (async () => {
        // "/" rather than a dedicated endpoint: it exercises the real render
        // path, so a container that booted but cannot serve a page shows up in
        // the cron logs instead of at the next user.
        const res = await container.fetch(
          new Request("https://container/", { headers: { "x-warmup": "1" } }),
        );
        // Drain so the connection closes cleanly.
        await res.text();
        if (res.status >= 500) {
          console.error(`warmup got ${res.status}`);
        }
      })(),
    );
  },
};
