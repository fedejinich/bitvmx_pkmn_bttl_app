import { create } from 'zustand';

// Available Pokemon types
export type PokemonType = 'pikachu' | 'snorlax' | 'machoke';

// Game phases
export type GamePhase = 'intro' | 'selection' | 'fighting' | 'result';

// Battle state interface
interface BattleState {
  gamePhase: GamePhase;
  selectedPokemon: PokemonType | null;
  result: 'win' | 'lose' | null;
  
  // Game actions
  initializeGame: () => void;
  startBattle: () => void;
  selectPokemon: (pokemon: PokemonType) => void;
  simulateBattle: () => void;
  resetGame: () => void;
}

// Game state store
export const useBattle = create<BattleState>((set, get) => ({
  // Initial state
  gamePhase: 'intro',
  selectedPokemon: null,
  result: null,
  
  // Initialize game
  initializeGame: () => set({
    gamePhase: 'intro',
    selectedPokemon: null,
    result: null
  }),
  
  // Start battle (show selection screen)
  startBattle: () => set({ gamePhase: 'selection' }),
  
  // Handle Pokemon selection
  selectPokemon: (pokemon: PokemonType) => {
    set({ 
      selectedPokemon: pokemon,
      gamePhase: 'fighting'
    });
    
    // Simulate battle after 3 seconds
    setTimeout(() => get().simulateBattle(), 3000);
  },
  
  // Determine battle outcome
  simulateBattle: () => {
    // Only Pikachu can win against Charizard
    const battleResult = get().selectedPokemon === 'pikachu' ? 'win' : 'lose';
    set({
      result: battleResult,
      gamePhase: 'result'
    });
  },
  
  // Reset game to play again
  resetGame: () => set({
    gamePhase: 'intro',
    selectedPokemon: null,
    result: null
  })
}));
