/**
 * This file is intentionally simplified as the Pokemon Battle game is client-side only and doesn't use a database.
 */

// Simple placeholder types for compatibility with existing structure
export type InsertUser = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
};
