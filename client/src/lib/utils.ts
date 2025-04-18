/**
 * Utility functions for the Pokemon Battle game
 * 
 * Note: These localStorage utilities are kept for future functionality
 * but aren't currently used in the game.
 */

// Get item from localStorage with proper parsing
export const getLocalStorage = (key: string): any =>
  JSON.parse(window.localStorage.getItem(key) || "null");

// Set item in localStorage with proper serialization
export const setLocalStorage = (key: string, value: any): void =>
  window.localStorage.setItem(key, JSON.stringify(value));
