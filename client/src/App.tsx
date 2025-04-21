import { useEffect, useState } from "react";
import "@fontsource/inter";
import { useBattle, PokemonType } from "./lib/stores/useBattle";
import { useAudio } from "./lib/stores/useAudio";

// BitVMX Modal Component
function BitVMXModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md max-w-md w-full font-mono border-2 border-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">About BitVMX</h2>
          <button 
            onClick={onClose} 
            className="bg-red-300 border-2 border-black hover:bg-red-400 text-black font-bold px-2 py-1 rounded-md text-sm"
          >
            X
          </button>
        </div>
        <div className="text-sm mb-4">
          <p className="mb-2">BitVMX is an experimental Bitcoin Virtual Machine designed to enable Bitcoin-native zkSNARKs and fully verifiable off-chain computation.</p>
          <p className="mb-2">With BitVMX, smart contracts can be executed and verified entirely through Bitcoin transactions, enabling complex applications without requiring Layer 2 solutions.</p>
          <p className="mb-2">The technology is still in development but promises to unlock new potential for Bitcoin-based applications.</p>
        </div>
        <div className="text-center">
          <button 
            onClick={() => window.open('https://github.com/BitVM', '_blank')}
            className="bg-blue-300 border-2 border-black hover:bg-blue-400 text-black font-bold py-2 px-4 rounded-md text-sm"
          >
            VISIT GITHUB
          </button>
        </div>
      </div>
    </div>
  );
}

// Pokemon game component
function App() {
  // Game state
  const { 
    gamePhase, 
    initializeGame, 
    selectPokemon, 
    resetGame, 
    startBattle,
    result,
    selectedPokemon 
  } = useBattle();
  
  // Audio state
  const { setHitSound, setSuccessSound, playHit, playSuccess } = useAudio();
  const [dots, setDots] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // BitVMX explorer URL (to be updated with the actual URL)
  const [explorerUrl, setExplorerUrl] = useState("https://bitcoin.org"); // Placeholder URL

  // Initialize game and load sounds
  useEffect(() => {
    initializeGame();
    
    // Load sound effects
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    setHitSound(hitSound);
    setSuccessSound(successSound);
  }, [initializeGame, setHitSound, setSuccessSound]);

  // Animate dots and play sounds during battle
  useEffect(() => {
    if (gamePhase !== "fighting") return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
      playHit();
    }, 500);
    
    return () => clearInterval(interval);
  }, [gamePhase, playHit]);

  // Play success sound when winning
  useEffect(() => {
    if (result === "win") {
      playSuccess();
    }
  }, [result, playSuccess]);

  // Pokemon options
  const pokemonOptions = [
    {
      id: "pikachu" as PokemonType,
      name: "Pikachu"
    },
    {
      id: "snorlax" as PokemonType,
      name: "Snorlax"
    },
    {
      id: "machoke" as PokemonType,
      name: "Machoke"
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col font-mono overflow-hidden relative">
      {/* BitVMX Information Modal */}
      <BitVMXModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0" 
        style={{ 
          backgroundImage: "url('/images/backgrounds/pokemon-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
      
      {/* Main Game Container - Takes full viewport height */}
      <div className="w-full pt-8 h-full flex flex-col items-center justify-between relative z-10">
        {/* 1. Title (Game Logo) - Fixed at top with more padding */}
        <div className="pt-8 pb-6 text-center">
          <h1 className="pokemon-title drop-shadow-lg text-4xl sm:text-5xl">PKMN_BTTL</h1>
          <p className="text-xs text-white font-bold mt-1 px-2 py-1 inline-block" 
             style={{ letterSpacing: '0.5px', textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
            Powered by BitVMX!
          </p>
        </div>
        
        {/* Main Game Area - Flex to distribute space */}
        <div className="w-full max-w-3xl mx-auto flex flex-col justify-between flex-grow px-2 sm:px-4">
          
          {/* 2. STATUS BOXES - Side by side, consistent sizing */}
          <div className="w-full flex flex-row justify-between items-start px-1 sm:px-4 mt-14 sm:mt-16">
            {/* Player's Pokemon stats */}
            <div className="flex flex-col items-center w-[45%] sm:w-2/5">
              {(gamePhase === "fighting" || gamePhase === "result") && selectedPokemon ? (
                <div className="bg-white border-2 border-black p-2 z-10 w-full font-mono">
                  <div className="font-bold text-sm">{selectedPokemon.toUpperCase()}</div>
                  <div className="text-sm">L50</div>
                  <div className="flex items-center justify-start text-sm">
                    <span className="mr-1">HP</span>
                    <div className="h-3 bg-white border border-black relative w-full">
                      <div className="absolute top-0 left-0 h-full bg-green-500" 
                           style={{width: result === 'lose' ? '0%' : '100%'}}></div>
                    </div>
                  </div>
                  <div className="text-left text-sm">{result === 'lose' ? '0' : '180'}/180</div>
                </div>
              ) : (
                <div className="bg-white border-2 border-black p-2 z-10 w-full font-mono">
                  <div className="font-bold text-sm">???</div>
                  <div className="text-sm">L??</div>
                  <div className="flex items-center justify-start text-sm">
                    <span className="mr-1">HP</span>
                    <div className="bg-white border border-black relative w-full h-3">
                      <div className="absolute top-0 left-0 h-full bg-gray-300 w-full"></div>
                    </div>
                  </div>
                  <div className="text-left text-sm">???/???</div>
                </div>
              )}
            </div>
            
            {/* Charizard stats */}
            <div className="flex flex-col items-center w-[45%] sm:w-2/5">
              <div className="bg-white border-2 border-black p-2 z-10 w-full font-mono">
                <div className="font-bold text-sm">CHARIZARD</div>
                <div className="text-sm">L68 ♂</div>
                <div className="flex items-center justify-start text-sm">
                  <span className="mr-1">HP</span>
                  <div className="bg-white border border-black relative w-full h-3">
                    <div className="absolute top-0 left-0 h-full bg-green-500" 
                         style={{width: gamePhase === "result" && result === "win" ? '0%' : '100%'}}></div>
                  </div>
                </div>
                <div className="text-left text-sm">{gamePhase === "result" && result === "win" ? '0' : '224'}/224</div>
              </div>
            </div>
          </div>
          
          {/* 3. ARENA (BATTLE AREA) - Center, with fixed height sprites */}
          <div className="w-full flex-grow flex flex-col justify-center items-center relative" style={{ minHeight: "200px" }}> 
            {/* Battle Container - Center in the screen - tall enough for Charizard on all screens */}
            <div className="w-full flex items-end justify-center h-[250px] sm:h-[250px] mb-[120px] sm:mb-[120px]">
              {/* Player's Pokemon or Pokéball - Left side */}
              <div className="absolute left-[20%] sm:left-[27.5%] transform -translate-x-1/2 flex items-end">
                {(gamePhase === "fighting" || gamePhase === "result") ? (
                  selectedPokemon && (
                    <div>
                      <img src={`/images/sprites/pokemon/${selectedPokemon === 'machoke' ? 'animated/machoke.gif' : `${selectedPokemon}.png`}`}
                           alt={selectedPokemon}
                           className={`h-[100px] w-auto object-contain ${gamePhase === "result" && result === "lose" ? "opacity-70" : ""}`}
                           style={{ 
                             imageRendering: "pixelated",
                             transform: "scaleX(-1)" // Flip horizontally to face Charizard
                           }} />
                    </div>
                  )
                ) : (
                  <div>
                    <div className="transition-transform hover:scale-110 cursor-pointer animate-bounce">
                      <img src="/images/sprites/pokemon/pokeball.png" 
                           alt="Pokéball" 
                           className="h-[70px] w-auto object-contain"
                           style={{ 
                             imageRendering: "pixelated"
                           }} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Charizard - Right side */}
              <div className="absolute right-[20%] sm:right-[27.5%] transform translate-x-1/2 flex items-end">
                <img src="/images/sprites/pokemon/animated/charizard.gif" 
                     alt="Charizard" 
                     className={`h-[200px] sm:h-[200px] w-auto object-contain ${gamePhase === "result" && result === "win" ? "opacity-70" : ""}`}
                     style={{ 
                       imageRendering: "pixelated"
                     }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* 4 & 5. BOTTOM UI (MESSAGE BOX & ACTION BUTTONS) - Fixed at bottom with more margin */}
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 absolute bottom-0 left-1/2 transform -translate-x-1/2" 
             style={{ 
               backdropFilter: "blur(1px)",
               marginBottom: "8px"
             }}>
          {/* Message Box - Always visible, text changes dynamically */}
          <div className="w-full border-2 border-black p-2 bg-white flex items-center mb-2" 
               style={{ 
                 height: "3.5rem",
                 overflow: "hidden",
                 backgroundColor: "rgba(255, 255, 255, 0.95)" 
               }}>
            <div className="w-full h-full flex items-center">
              {gamePhase === "intro" && (
                <div className="w-full text-sm text-black font-mono text-left leading-tight">
                  Win the Pokémon battle to unlock Bitcoin rewards! Choose wisely.
                </div>
              )}
              
              {gamePhase === "selection" && (
                <div className="w-full text-sm text-black font-mono text-left leading-tight">
                  Choose your Pokémon:
                </div>
              )}
              
              {gamePhase === "fighting" && (
                <div className="w-full text-sm text-black font-mono text-left leading-tight">
                  {selectedPokemon && selectedPokemon.toUpperCase()} used THUNDERBOLT{dots}
                </div>
              )}
              
              {gamePhase === "result" && result === "win" && (
                <div className="w-full text-sm text-black font-mono text-left leading-tight">
                  Enemy CHARIZARD fainted! You unlocked BITCOIN rewards!
                </div>
              )}
              
              {gamePhase === "result" && result === "lose" && (
                <div className="w-full text-sm text-black font-mono text-left leading-tight">
                  You lost the battle! BITCOIN rewards remain locked.
                </div>
              )}
            </div>
          </div>
          
          {/* Action Button - Directly below message box */}
          <div className="flex items-center justify-center mb-4">
            {/* Intro buttons */}
            {gamePhase === "intro" && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center items-center">
                {/* Start battle button */}
                <button 
                  className="bg-red-300 border-2 border-black hover:bg-red-400 text-black font-bold py-2 px-4 md:px-6 rounded-md text-xs md:text-sm font-mono w-full sm:w-auto"
                  onClick={startBattle}
                >
                  I WANT TO BATTLE FOR BITCOINS!
                </button>

                {/* Info button */}
                <button 
                  className="bg-blue-300 border-2 border-black hover:bg-blue-400 text-black font-bold py-2 px-4 md:px-6 rounded-md text-xs md:text-sm font-mono w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  MORE ABOUT BITVMX
                </button>
              </div>
            )}
            
            {/* Pokemon selection buttons - Row on desktop, stack on mobile */}
            {gamePhase === "selection" && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full justify-center items-center">
                {pokemonOptions.map((pokemon) => (
                  <button 
                    key={pokemon.id}
                    className="bg-red-300 border-2 border-black hover:bg-red-400 text-black font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-md text-xs w-full sm:w-auto font-mono"
                    onClick={() => selectPokemon(pokemon.id)}
                  >
                    {pokemon.name.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
            
            {/* Result buttons */}
            {gamePhase === "result" && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center items-center">
                {/* Start over button */}
                <button 
                  className="bg-red-300 border-2 border-black hover:bg-red-400 text-black font-bold py-2 px-4 md:px-6 rounded-md text-xs md:text-sm font-mono w-full sm:w-auto"
                  onClick={resetGame}
                >
                  START OVER
                </button>
                
                {/* BitVMX Explorer link */}
                <button 
                  className="bg-blue-300 border-2 border-black hover:bg-blue-400 text-black font-bold py-2 px-4 md:px-6 rounded-md text-xs md:text-sm font-mono w-full sm:w-auto"
                  onClick={() => window.open(explorerUrl, '_blank')}
                >
                  VIEW ON BITVMX EXPLORER
                </button>

                {/* Info button */}
                <button 
                  className="bg-blue-300 border-2 border-black hover:bg-blue-400 text-black font-bold py-2 px-4 md:px-6 rounded-md text-xs md:text-sm font-mono w-full sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  MORE ABOUT BITVMX
                </button>
              </div>
            )}
            
            {/* Hidden placeholder for fighting phase to maintain layout */}
            {gamePhase === "fighting" && (
              <div className="invisible h-10">Placeholder</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
