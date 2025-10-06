import { createServer } from "http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../server/app";

let cached: { server?: ReturnType<typeof createServer> } = {};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cached.server) {
    const { app, server } = await createApp();
    cached.server = server;
    server.on("request", app);
  }
  cached.server!.emit("request", req, res);
}


