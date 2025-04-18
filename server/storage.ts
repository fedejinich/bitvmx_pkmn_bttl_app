/**
 * This file is kept as a minimal stub for compatibility
 * The Pokemon Battle game is client-side only and doesn't require server storage
 */

import { type User, type InsertUser } from "@shared/schema";

// Minimal storage interface - not used in the game
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// Empty implementation
export class MemStorage implements IStorage {
  async getUser(): Promise<undefined> {
    return undefined;
  }

  async getUserByUsername(): Promise<undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return { ...insertUser, id: 1 };
  }
}

export const storage = new MemStorage();
