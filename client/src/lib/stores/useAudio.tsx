import { create } from "zustand";

// Audio state interface
interface AudioState {
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Sound setters
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  
  // Sound playback
  playHit: () => void;
  playSuccess: () => void;
}

// Audio state store
export const useAudio = create<AudioState>((set, get) => ({
  // Initial state
  hitSound: null,
  successSound: null,
  isMuted: true, // Start muted by default
  
  // Sound setters
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  
  // Play hit sound effect
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound && !isMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(() => {});
    } else if (hitSound) {
      console.log("Hit sound skipped (muted)");
    }
  },
  
  // Play success sound effect
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.play().catch(() => {});
    } else if (successSound) {
      console.log("Success sound skipped (muted)");
    }
  }
}));
