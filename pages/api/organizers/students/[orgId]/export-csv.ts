import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import zlib from "zlib";

function decompress(data: any, headers: any): Buffer | string {
  if (data && typeof data === "object" && !Buffer.isBuffer(data)) return data;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const enc =
    headers &&
    (headers["content-encoding"] || headers["Content-Encoding"]);
  try {
    if (enc === "gzip" || enc === "x-gzip")
      return zlib.gunzipSync(buf as unknown as Uint8Array);
    if (enc === "deflate")
      return zlib.inflateSync(buf as unknown as Uint8Array);
    if (enc === "br")
      return zlib.brotliDecompressSync(buf as unknown as Uint8Array);
  } catch {
    /* fall through to raw text */
  }
  return buf;
}

const serverHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Encoding": "identity",
  },
  transformResponse: [
    (data: any, headers: any) => {
      const dec = decompress(data, headers);
      const text = Buffer.isBuffer(dec)
        ? dec.toString("utf8")
        : String(dec);
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  ],
  responseType: "arraybuffer",
});

function extractAccessToken(req: NextApiRequest): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  throw new Error("No valid access token found");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orgId } = req.query;

  if (!orgId || Array.isArray(orgId)) {
    return res.status(400).json({ error: "Valid orgId is required" });
  }

  try {
    const accessToken = extractAccessToken(req);

    const response = await serverHttp.get(
      `/organization/${orgId}/users/students/export/csv/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Encoding": "identity",
        },
        responseType: "arraybuffer",
      }
    );

    const contentDisposition =
      response.headers["content-disposition"] ||
      `attachment; filename="organization-${orgId}-students.csv"`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", contentDisposition);
    res.send(Buffer.from(response.data));
  } catch (error: any) {
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }

    res.status(500).json({
      error: "Failed to export CSV",
      details: error.message,
    });
  }
}
