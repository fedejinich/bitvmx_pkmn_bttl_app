import type { Express } from "express";
import { createServer, type Server } from "http";

/**
 * Creates and returns an HTTP server for the Express application
 * This is a simple setup as our game is frontend-only and doesn't need API routes
 */
export async function registerRoutes(app: Express): Promise<Server> {
  return createServer(app);
}
