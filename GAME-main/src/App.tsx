import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, RotateCcw, Brain, Timer, Lightbulb, MessageCircle, Star, Zap, Globe, Music } from 'lucide-react';

type GameState = 'menu' | 'playing' | 'gameover';

type GlassDef = {
  id: string;
  name: string;
  capacity: number;
  className: string;
  waterClassName?: string;
};

const GLASSES: GlassDef[] = [
  { id: 'standard', name: 'Standard Glass', capacity: 1, className: 'w-56 h-80 rounded-b-[2.5rem]', waterClassName: 'rounded-b-[2.5rem]' },
  { id: 'shot', name: 'Shot Glass', capacity: 0.25, className: 'w-28 h-36 rounded-b-2xl', waterClassName: 'rounded-b-2xl' },
  { id: 'pint', name: 'Tall Pint', capacity: 1.5, className: 'w-44 h-96 rounded-b-3xl', waterClassName: 'rounded-b-3xl' },
  { id: 'bowl', name: 'Fishbowl', capacity: 2, className: 'w-72 h-64 rounded-b-[4rem]', waterClassName: 'rounded-b-[4rem]' }
];

const CATEGORIES = {
  en: [
    "Animals", "Countries", "Fruits", "Colors", "Movies", 
    "Sports", "Brands", "Professions", "Vehicles", "Musical Instruments",
    "Food", "Cities", "Languages", "Superheroes", "Cartoon Characters"
  ],
  th: [
    "สัตว์", "ประเทศ", "ผลไม้", "สี", "ภาพยนตร์",
    "กีฬา", "แบรนด์", "อาชีพ", "ยานพาหนะ", "เครื่องดนตรี",
    "อาหาร", "เมือง", "ภาษา", "ซูเปอร์ฮีโร่", "ตัวการ์ตูน"
  ]
};

const SYNC_WORDS = {
  en: [
    "Sun", "Water", "Fire", "Snow", "Rain", "Ice", "Star", "Moon", "Sea", "Tree",
    "Wood", "Gold", "Black", "White", "Red", "Blue", "Green", "Hot", "Cold", "Sweet",
    "Big", "Small", "Fast", "Slow", "Hard", "Soft", "High", "Time", "Life", "Day"
  ],
  th: [
    "ข้าว", "น้ำ", "รถ", "ไฟ", "ยาง", "ทอง", "ดิน", "ลม", "ฟ้า", "หมู",
    "ไก่", "ปลา", "นก", "เสือ", "หมี", "แมว", "หมา", "บ้าน", "วัด", "โรง",
    "ยา", "ชา", "กา", "นม", "พัด", "รอง", "แว่น", "นา", "แม่", "พ่อ"
  ]
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'th'>('th');
  const [gameMode, setGameMode] = useState<'home' | 'spill' | 'category' | 'truth'>('home');
  const [gameState, setGameState] = useState<GameState>('menu');
  const [waterLevel, setWaterLevel] = useState(0);
  const [streamIntensity, setStreamIntensity] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [loser, setLoser] = useState<number | null>(null);
  const [isPouring, setIsPouring] = useState(false);
  const [glassIndex, setGlassIndex] = useState(0);
  const [hasTapped, setHasTapped] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Category Game State
  const [currentCategory, setCurrentCategory] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCategoryPlaying, setIsCategoryPlaying] = useState(false);
  const [isCategoryGameOver, setIsCategoryGameOver] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Sync or Drink Game State
  const [currentSyncWord, setCurrentSyncWord] = useState('');
  const [isSyncPlaying, setIsSyncPlaying] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const waterLevelRef = useRef(0);
  const isPouringRef = useRef(false);
  const tiltRef = useRef(0);
  const hasPouredThisTurnRef = useRef(false);
  const overflowThresholdRef = useRef(103);
  
  const gameStateRef = useRef(gameState);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  
  const currentPlayerRef = useRef(currentPlayer);
  useEffect(() => { currentPlayerRef.current = currentPlayer; }, [currentPlayer]);

  const selectedGlass = GLASSES[glassIndex];
  const selectedGlassRef = useRef(selectedGlass);
  useEffect(() => { selectedGlassRef.current = selectedGlass; }, [selectedGlass]);

  // Difficulty modifiers
  const basePourRate = 45; // % per second for standard glass at max tilt

  const resetToMenu = () => {
    setGameState('menu');
    setWaterLevel(0);
    setStreamIntensity(0);
    waterLevelRef.current = 0;
    tiltRef.current = 0;
    setLoser(null);
    setIsPouring(false);
    isPouringRef.current = false;
    hasPouredThisTurnRef.current = false;
    setHasTapped(false);
  };

  const handleGlassChange = (i: number) => {
    if (gameState === 'playing') return;
    if (gameState === 'gameover') {
      resetToMenu();
    }
    setGlassIndex(i);
  };

  const startGame = () => {
    setGameState('playing');
    setWaterLevel(0);
    setStreamIntensity(0);
    waterLevelRef.current = 0;
    tiltRef.current = 0;
    setCurrentPlayer(1);
    setLoser(null);
    setIsPouring(false);
    isPouringRef.current = false;
    hasPouredThisTurnRef.current = false;
    setHasTapped(false);
    // Randomize overflow threshold between 101 and 106
    overflowThresholdRef.current = 101 + Math.random() * 5;
  };

  const handleOverflow = () => {
    setIsPouring(false);
    isPouringRef.current = false;
    setGameState('gameover');
    setLoser(currentPlayerRef.current);
  };

  // Category Game Logic
  const startCategoryGame = () => {
    const randomCategory = CATEGORIES[lang][Math.floor(Math.random() * CATEGORIES[lang].length)];
    setCurrentCategory(randomCategory);
    setTimeLeft(5);
    setIsCategoryPlaying(true);
    setIsCategoryGameOver(false);
  };

  const handleCategoryNext = () => {
    if (!isCategoryPlaying || isCategoryGameOver) return;
    // Just reset the timer, do not change the category
    setTimeLeft(5);
  };

  // Sync Game Logic
  const startSyncGame = () => {
    const randomWord = SYNC_WORDS[lang][Math.floor(Math.random() * SYNC_WORDS[lang].length)];
    setCurrentSyncWord(randomWord);
    setIsSyncPlaying(true);
  };

  const handleSyncNext = () => {
    if (!isSyncPlaying) return;
    const randomWord = SYNC_WORDS[lang][Math.floor(Math.random() * SYNC_WORDS[lang].length)];
    setCurrentSyncWord(randomWord);
  };

  useEffect(() => {
    if (isCategoryPlaying && !isCategoryGameOver) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsCategoryGameOver(true);
            setIsCategoryPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCategoryPlaying, isCategoryGameOver]);

  const loop = (time: number) => {
    if (gameStateRef.current !== 'playing') return;

    if (lastTimeRef.current != undefined) {
      const deltaTime = time - lastTimeRef.current;
      
      const tiltSpeed = 0.003; // ~333ms to full tilt (allows for short taps)
      const untiltSpeed = 0.006; // ~166ms to stop
      
      if (isPouringRef.current) {
        tiltRef.current = Math.min(1, tiltRef.current + deltaTime * tiltSpeed);
      } else {
        tiltRef.current = Math.max(0, tiltRef.current - deltaTime * untiltSpeed);
        
        if (tiltRef.current === 0 && hasPouredThisTurnRef.current) {
          setCurrentPlayer(p => p === 1 ? 2 : 1);
          hasPouredThisTurnRef.current = false;
        }
      }

      setStreamIntensity(tiltRef.current);

      if (tiltRef.current > 0) {
        const actualPourRate = basePourRate / selectedGlassRef.current.capacity;
        const jitter = 1 + (Math.random() * 0.1 - 0.05);
        // Exponential flow rate: light press = very little water, hard press = lots of water
        const currentPourRate = actualPourRate * Math.pow(tiltRef.current, 2.5) * jitter;

        waterLevelRef.current += (currentPourRate * deltaTime) / 1000;
        
        if (waterLevelRef.current > overflowThresholdRef.current) {
          waterLevelRef.current = overflowThresholdRef.current + 2;
          setWaterLevel(overflowThresholdRef.current + 2);
          handleOverflow();
          return;
        }
        setWaterLevel(waterLevelRef.current);
      }
    }
    
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  const startPouring = (e: React.SyntheticEvent | React.MouseEvent) => {
    if ('button' in e && (e as React.MouseEvent).button !== 0) return;
    if (gameState !== 'playing') return;
    isPouringRef.current = true;
    setIsPouring(true);
    hasPouredThisTurnRef.current = true;
    setHasTapped(true);
  };

  const stopPouring = (e: React.SyntheticEvent) => {
    if (!isPouringRef.current) return;
    isPouringRef.current = false;
    setIsPouring(false);
  };

  // Tension effect when water is high
  const tensionShake = waterLevel > 95 && gameState === 'playing' 
    ? `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)` 
    : 'none';

  const meniscus = Math.max(0, waterLevel - 98);
  // Cap visual meniscus so it doesn't grow too large if overflow threshold is high
  const visualMeniscus = Math.min(meniscus, 4);
  const surfaceHeight = 16 + streamIntensity * 8 + visualMeniscus * 4;

  return (
    <div className="fixed inset-0 bg-[#1a0b05] font-sans selection:bg-[#ffb38a]/30">
      <div className="w-full h-full bg-gradient-to-br from-[#b84a22] via-[#8c3314] to-[#4a1705] overflow-hidden flex flex-col relative">
        
        {/* Top Nav */}
        <header className="flex justify-between items-center p-4 md:p-8 z-20">
          <div 
            className="flex items-center gap-2 font-bold text-xl md:text-2xl text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setGameMode('home')}
          >
            <div className="w-5 h-5 md:w-6 md:h-6 bg-white flex items-center justify-center rounded-sm">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#8c3314] rounded-sm" />
            </div>
            Party Games
          </div>
          
          {gameMode !== 'home' && (
            <nav className="hidden lg:flex gap-10 text-sm text-white/80">
              <button 
                onClick={() => setGameMode('spill')}
                className={`flex items-center gap-2 transition-colors font-medium ${gameMode === 'spill' ? 'text-white' : 'hover:text-white opacity-50'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${gameMode === 'spill' ? 'bg-[#ffb38a]' : 'bg-white/30'}`} />
                Spill & Lose
              </button>
              <button 
                onClick={() => {
                  setGameMode('category');
                  setIsCategoryPlaying(false);
                  setIsCategoryGameOver(false);
                }}
                className={`flex items-center gap-2 transition-colors hover:text-white ${gameMode === 'category' ? 'text-white opacity-100' : 'opacity-50'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${gameMode === 'category' ? 'bg-[#ffb38a]' : 'bg-white/30'}`} />
                Category Guessing
              </button>
              <button 
                onClick={() => {
                  setGameMode('truth');
                  setIsSyncPlaying(false);
                }}
                className={`flex items-center gap-2 transition-colors hover:text-white ${gameMode === 'truth' ? 'text-white opacity-100' : 'opacity-50'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${gameMode === 'truth' ? 'bg-[#ffb38a]' : 'bg-white/30'}`} />
                {lang === 'th' ? 'พูดตรงรอดกิน' : 'Sync or Drink'}
              </button>
            </nav>
          )}

          {/* Mobile Game Mode Selector */}
          {gameMode !== 'home' && (
            <div className="lg:hidden absolute top-20 left-4 right-4 z-30 flex justify-center">
              <div className="relative w-full max-w-[240px]">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full px-5 py-2.5 rounded-full bg-[#ffb38a] text-black text-sm font-bold flex items-center justify-between shadow-lg"
                >
                  <span>
                    {gameMode === 'spill' ? 'Spill & Lose' : 
                     gameMode === 'category' ? 'Category Guessing' : 
                     (lang === 'th' ? 'พูดตรงรอดกิน' : 'Sync or Drink')}
                  </span>
                  <span className={`text-xs transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 right-0 bg-[#4a1705]/95 backdrop-blur-md border border-[#ffb38a]/30 rounded-xl overflow-hidden flex flex-col shadow-2xl"
                    >
                      <button 
                        onClick={() => { setGameMode('spill'); setIsMobileMenuOpen(false); }}
                        className={`px-5 py-3.5 text-sm text-left transition-colors ${gameMode === 'spill' ? 'text-[#ffb38a] font-bold bg-white/5' : 'text-white hover:bg-white/5'}`}
                      >
                        Spill & Lose
                      </button>
                      <button 
                        onClick={() => { 
                          setGameMode('category'); 
                          setIsCategoryPlaying(false);
                          setIsCategoryGameOver(false);
                          setIsMobileMenuOpen(false); 
                        }}
                        className={`px-5 py-3.5 text-sm text-left border-t border-white/10 transition-colors ${gameMode === 'category' ? 'text-[#ffb38a] font-bold bg-white/5' : 'text-white hover:bg-white/5'}`}
                      >
                        Category Guessing
                      </button>
                      <button 
                        onClick={() => { 
                          setGameMode('truth'); 
                          setIsSyncPlaying(false);
                          setIsMobileMenuOpen(false); 
                        }}
                        className={`px-5 py-3.5 text-sm text-left border-t border-white/10 transition-colors ${gameMode === 'truth' ? 'text-[#ffb38a] font-bold bg-white/5' : 'text-white hover:bg-white/5'}`}
                      >
                        {lang === 'th' ? 'พูดตรงรอดกิน' : 'Sync or Drink'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')} 
            className="flex items-center gap-2 border border-white/40 px-3 py-1.5 md:px-4 md:py-2 rounded-sm text-sm text-white hover:bg-white/10 transition-colors uppercase font-medium tracking-wider"
          >
            <Globe size={16} />
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </header>

        {/* Main Content */}
        {gameMode === 'home' ? (
          <main className="flex-1 flex flex-col px-4 md:px-8 pb-4 md:pb-8 z-20 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full pt-4 md:pt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                {lang === 'th' ? 'เลือกเกมที่จะเล่น' : 'Choose a Game'}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Featured Game: Spill & Lose */}
                <div 
                  onClick={() => setGameMode('spill')} 
                  className="lg:col-span-8 bg-gradient-to-br from-[#b84a22] to-[#4a1705] rounded-[2rem] p-8 md:p-12 cursor-pointer hover:scale-[1.01] transition-transform border border-white/10 shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col justify-end"
                >
                  <div className="absolute -top-10 -right-10 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:rotate-12">
                    <Droplets size={250} />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4">
                      <Star size={14} className="text-[#ffb38a]" fill="currentColor" />
                      {lang === 'th' ? 'ยอดนิยม' : 'Popular'}
                    </div>
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">Spill & Lose</h3>
                    <p className="text-white/80 text-lg md:text-xl max-w-md mb-8 font-light">
                      {lang === 'th' ? 'ผลัดกันรินน้ำ อย่าให้ล้นแก้ว! บททดสอบความนิ่งของมือและมิตรภาพของคุณ' : 'Take turns pouring water. Don\'t let it overflow! A comprehensive approach to testing your nerves.'}
                    </p>
                    <div className="flex items-center gap-2 text-[#ffb38a] font-bold text-lg group-hover:translate-x-2 transition-transform">
                      {lang === 'th' ? 'เล่นเลย' : 'Play Now'} <span>→</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Category Guessing */}
                  <div 
                    onClick={() => { setGameMode('category'); setIsCategoryPlaying(false); setIsCategoryGameOver(false); }} 
                    className="flex-1 bg-gradient-to-br from-indigo-600 to-blue-900 rounded-[2rem] p-8 cursor-pointer hover:scale-[1.02] transition-transform border border-white/10 shadow-xl relative overflow-hidden group flex flex-col justify-end"
                  >
                    <div className="absolute -top-4 -right-4 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:rotate-12">
                      <Brain size={120} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Category<br/>Guessing</h3>
                      <p className="text-white/70 mb-6 text-sm">
                        {lang === 'th' ? 'แข่งกันนึกคำศัพท์ในหมวดหมู่ที่กำหนดภายใน 5 วินาที' : 'Race to name words in a given category within 5 seconds.'}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-300 font-bold group-hover:translate-x-2 transition-transform">
                        {lang === 'th' ? 'เล่นเลย' : 'Play Now'} <span>→</span>
                      </div>
                    </div>
                  </div>

                  {/* Sync or Drink */}
                  <div 
                    onClick={() => { setGameMode('truth'); setIsSyncPlaying(false); }} 
                    className="flex-1 bg-gradient-to-br from-emerald-600 to-teal-900 rounded-[2rem] p-8 cursor-pointer hover:scale-[1.02] transition-transform border border-white/10 shadow-xl relative overflow-hidden group flex flex-col justify-end"
                  >
                    <div className="absolute -top-4 -right-4 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:rotate-12">
                      <MessageCircle size={120} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{lang === 'th' ? 'พูดตรง' : 'Sync or'}<br/>{lang === 'th' ? 'รอดกิน' : 'Drink'}</h3>
                      <p className="text-white/70 mb-6 text-sm">
                        {lang === 'th' ? 'ใจตรงกันรอด ใจไม่ตรงกันดื่ม! ทดสอบความรู้ใจ' : 'Think alike and survive, or drink! Test your synergy.'}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-300 font-bold group-hover:translate-x-2 transition-transform">
                        {lang === 'th' ? 'เล่นเลย' : 'Play Now'} <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : gameMode === 'spill' ? (
          <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] px-4 md:px-8 pb-4 md:pb-8 z-20 gap-2 lg:gap-8 overflow-hidden relative">
            
            {/* Left Column */}
          <div className="relative lg:relative top-0 left-0 right-0 lg:inset-auto flex flex-col justify-start lg:justify-between pt-2 md:pt-8 pb-0 md:pb-4 shrink-0 pointer-events-none lg:pointer-events-auto z-0">
            <p className="max-w-xs text-white/80 text-sm md:text-lg leading-relaxed font-light hidden md:block">
              {lang === 'th' ? 'จากหยดน้ำเล็กๆ สู่การหกครั้งใหญ่ บททดสอบความนิ่งของมือและมิตรภาพของคุณ' : 'From a single drop to a massive spill, a comprehensive approach to testing your nerves and friendships.'}
            </p>
            
            <div className="my-auto lg:my-auto mt-4 lg:mt-0">
              <h1 className="text-5xl md:text-6xl xl:text-[5.5rem] font-medium leading-[1.05] tracking-tight">
                <span className="text-[#ffb38a]">Don't let it</span><br />
                <span className="text-white">overflow</span>
              </h1>
            </div>
          </div>

          {/* Center Column (The Glass) */}
          <div 
            className="relative flex items-center justify-center w-full lg:w-[400px] xl:w-[500px] flex-1 lg:h-auto shrink-0 touch-none select-none cursor-pointer lg:cursor-default z-10 mt-4 lg:mt-0"
            onMouseDown={startPouring}
            onMouseUp={stopPouring}
            onMouseLeave={stopPouring}
            onTouchStart={startPouring}
            onTouchEnd={stopPouring}
          >
            {gameState === 'playing' && !hasTapped && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-pulse lg:hidden pointer-events-none z-50 whitespace-nowrap">
                {lang === 'th' ? 'แตะค้างที่แก้วเพื่อริน' : 'Tap and hold glass to pour'}
              </div>
            )}
            
            {/* Glass Container (for spills) */}
            <div className="relative flex items-end justify-center h-[200px] md:h-[350px] lg:h-[450px] z-10 w-full pointer-events-none">
              {/* Shake Container */}
              <div style={{ transform: tensionShake }} className="relative flex items-end justify-center h-full w-full scale-[0.6] md:scale-100 origin-bottom">
                {/* The Glass */}
                <div 
                  className={`relative border-x-4 border-b-4 border-white/30 bg-gradient-to-b from-white/5 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[width,height,border-radius] duration-500 ${selectedGlass.className}`}
                >
                {/* Glass Rim Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30" />

                {/* Beer Stream */}
                {streamIntensity > 0 && (
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-200/70 rounded-b-full z-20 blur-[1px]" 
                    style={{ 
                      height: `${100 - Math.min(waterLevel, 100)}%`,
                      width: `${Math.max(4, streamIntensity * 24)}px`,
                      opacity: streamIntensity
                    }} 
                  >
                    {/* Inner stream core */}
                    <div className="absolute inset-x-[20%] top-0 bottom-0 bg-white/50 rounded-b-full" />
                  </div>
                )}
                
                {/* Beer Body */}
                {waterLevel > 0 && (
                  <div 
                    className={`absolute bottom-0 left-0 right-0 bg-amber-500/60 backdrop-blur-md z-10 ${selectedGlass.waterClassName}`}
                    style={{ height: `${Math.min(waterLevel, 100)}%` }}
                  >
                    {/* Surface / Foam */}
                    <div 
                      className="absolute top-0 left-0 right-0 z-20"
                      style={{
                        height: `${surfaceHeight}px`,
                        transform: `translateY(-50%) scaleX(${1 + visualMeniscus * 0.01})`,
                      }}
                    >
                      <div className={`w-full h-full relative ${streamIntensity > 0 ? 'animate-slosh' : ''}`}>
                        {/* Beer Surface (under foam) */}
                        <div 
                          className="absolute inset-0 bg-amber-500/80 border-[0.5px] border-amber-300/50 translate-y-[20%]"
                          style={{ borderRadius: visualMeniscus > 2 ? '50% 50% 48% 48%' : '50%' }}
                        />
                        
                        {/* Foam Surface */}
                        <div 
                          className="absolute inset-0 bg-yellow-50 shadow-[0_0_15px_rgba(255,255,255,0.8)] border border-white/80 scale-105 -translate-y-[5%]"
                          style={{ borderRadius: visualMeniscus > 2 ? '50% 50% 48% 48%' : '50%' }}
                        >
                          {/* Foam texture on surface */}
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,white_2px,transparent_2px)] bg-[size:6px_6px] rounded-[inherit]" />

                          {/* Meniscus Bulge Highlight */}
                          {visualMeniscus > 0 && (
                            <div 
                              className="absolute top-[5%] left-[30%] right-[30%] bg-white/90 rounded-full blur-[2px]"
                              style={{ height: `${visualMeniscus * 2}px`, opacity: visualMeniscus / 4 }}
                            />
                          )}

                          {/* Surface ripples when pouring */}
                          {streamIntensity > 0 && (
                            <div className="absolute inset-0 rounded-[50%] border-2 border-white/60 animate-ping" style={{ animationDuration: '0.8s' }} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Liquid Body (to hide bubbles overflowing the surface) */}
                    <div className={`absolute inset-0 overflow-hidden ${selectedGlass.waterClassName}`}>
                      {/* Depth gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-amber-600/70 to-yellow-300/30 mix-blend-multiply" />
                      
                      {/* Foam Layer inside the liquid body */}
                      <div 
                        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-yellow-50 to-yellow-100/40 z-20"
                        style={{ height: `${Math.min(waterLevel * 0.5, 30)}px` }}
                      >
                        {/* Foam texture */}
                        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,white_1.5px,transparent_1.5px)] bg-[size:5px_5px]" />
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,white_2.5px,transparent_2.5px)] bg-[size:8px_8px] bg-[position:3px_3px]" />
                      </div>
                      
                      {/* Caustics / Light reflection */}
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/30 via-white/5 to-transparent mix-blend-overlay" />
                      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-amber-200/20 to-transparent mix-blend-overlay" />
                      
                      {/* Bubbles */}
                      {waterLevel > 0 && (
                        <div className={`absolute inset-0 transition-opacity duration-500 ${streamIntensity > 0 ? 'opacity-80' : 'opacity-30'}`}>
                          {[...Array(12)].map((_, i) => (
                            <div 
                              key={i}
                              className="absolute bottom-0 w-1.5 h-1.5 bg-white/80 rounded-full blur-[0.5px]"
                              style={{
                                left: `${10 + Math.random() * 80}%`,
                                animation: `rise ${0.8 + Math.random() * 1.5}s infinite linear`,
                                animationDelay: `${Math.random() * 2}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Glass Front Reflection */}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-30 ${selectedGlass.waterClassName}`} />
                <div className="absolute top-2 bottom-8 left-3 w-3 rounded-full bg-gradient-to-b from-white/30 to-transparent blur-[2px] pointer-events-none z-30" />
                <div className="absolute top-1/4 bottom-1/4 right-3 w-1.5 rounded-full bg-white/10 blur-[1px] pointer-events-none z-30" />

                {/* Overflow Spills */}
                {waterLevel > overflowThresholdRef.current && (
                  <>
                    {/* Left spill */}
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: '110%', opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeIn' }}
                      className="absolute top-0 -left-3 w-2 bg-amber-400/80 rounded-b-full z-20 blur-[1px]"
                    >
                      <motion.div 
                        animate={{ y: [0, 100], opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                        className="absolute bottom-[-10px] left-0 w-2 h-4 bg-amber-300/90 rounded-full"
                      />
                    </motion.div>
                    
                    {/* Right spill */}
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: '115%', opacity: 1 }}
                      transition={{ duration: 0.6, ease: 'easeIn', delay: 0.1 }}
                      className="absolute top-0 -right-3 w-2.5 bg-amber-400/80 rounded-b-full z-20 blur-[1px]"
                    >
                      <motion.div 
                        animate={{ y: [0, 150], opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.2 }}
                        className="absolute bottom-[-15px] left-0 w-2.5 h-5 bg-amber-300/90 rounded-full"
                      />
                    </motion.div>
                    
                    {/* Front spill */}
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: '95%', opacity: 1 }}
                      transition={{ duration: 0.4, ease: 'easeIn', delay: 0.2 }}
                      className="absolute top-0 left-[20%] w-1.5 bg-amber-300/70 rounded-b-full z-30 blur-[1px]"
                    >
                      <motion.div 
                        animate={{ y: [0, 80], opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.4, ease: "linear", delay: 0.1 }}
                        className="absolute bottom-[-8px] left-0 w-1.5 h-3 bg-amber-200/90 rounded-full"
                      />
                    </motion.div>
                  </>
                )}
              </div>
              </div>
            </div>

            {/* Overflow puddle */}
            {waterLevel > overflowThresholdRef.current && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 w-64 md:w-96 h-12 md:h-16 bg-amber-500/50 blur-xl rounded-[100%] z-0 pointer-events-none" 
              >
                {/* Splash ripples */}
                <motion.div 
                  animate={{ scale: [1, 1.2], opacity: [0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 border-4 border-amber-300/40 rounded-[100%]"
                />
                <motion.div 
                  animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-0 border-2 border-amber-200/30 rounded-[100%]"
                />
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-end lg:justify-between pt-0 lg:pt-8 pb-0 lg:pb-4 lg:border-l lg:border-white/10 lg:pl-8 z-20 shrink-0 pointer-events-auto mt-auto">
            <p className="max-w-xs text-white/80 text-lg leading-relaxed font-light hidden lg:block">
              {lang === 'th' ? 'เลือกแก้วจากคอลเลกชันของเราและทดสอบความแม่นยำของคุณ' : 'Select from our collection of highly calibrated glasses and test your precision.'}
            </p>

            <div className="w-full max-w-sm my-auto mx-auto lg:mx-0">
              <div className="text-sm text-white/60 mb-2 md:mb-4 flex items-center gap-2">
                {lang === 'th' ? 'เลือกแก้ว' : 'Select Glass'} <span className="text-white">&gt;</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {GLASSES.map((g, i) => (
                  <button 
                    key={g.id}
                    onClick={() => handleGlassChange(i)}
                    disabled={gameState === 'playing'}
                    className={`p-2 md:p-4 rounded-lg border transition-all text-left ${glassIndex === i ? 'bg-white/10 border-white/30 shadow-lg' : 'bg-black/20 border-white/5 hover:bg-white/5'} ${gameState === 'playing' && glassIndex !== i ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium text-white text-[11px] md:text-sm">{g.name}</div>
                    <div className="text-white/50 text-[9px] md:text-xs mt-0.5 md:mt-1">{g.capacity}x Vol</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 md:mt-6 h-[50px] md:h-[60px]">
                {gameState === 'menu' ? (
                  <button 
                    onClick={startGame}
                    className="w-full h-full rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#ffb38a] text-black hover:bg-[#ffb38a]/90 active:scale-[0.98] font-bold text-lg shadow-[0_0_20px_rgba(255,179,138,0.4)]"
                  >
                    {lang === 'th' ? 'เริ่มเกม' : 'Start Game'}
                  </button>
                ) : (
                  <button 
                    onMouseDown={startPouring}
                    onMouseUp={stopPouring}
                    onMouseLeave={stopPouring}
                    onTouchStart={startPouring}
                    onTouchEnd={stopPouring}
                    className="hidden lg:flex w-full h-full rounded-sm items-center justify-center gap-2 transition-all select-none touch-none cursor-pointer bg-white text-black hover:bg-white/90 active:scale-[0.98] font-medium"
                  >
                    {lang === 'th' ? 'กดค้างเพื่อริน' : 'Hold to Pour'}
                  </button>
                )}
              </div>
            </div>
          </div>

          </main>
        ) : gameMode === 'category' ? (
          <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-4 md:pb-8 z-20 gap-8 min-h-0 relative">
            {/* Background Icons for Category Guessing */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] z-0">
              <Brain className="absolute top-10 left-10 w-32 h-32 -rotate-12 text-white" />
              <Timer className="absolute top-40 right-20 w-48 h-48 rotate-12 text-white" />
              <Lightbulb className="absolute bottom-20 left-20 w-40 h-40 rotate-45 text-white" />
              <MessageCircle className="absolute bottom-40 right-10 w-36 h-36 -rotate-12 text-white" />
              <Star className="absolute top-1/2 left-1/3 w-24 h-24 rotate-90 text-white" />
              <Globe className="absolute top-1/4 left-2/3 w-56 h-56 -rotate-45 text-white" />
              <Music className="absolute bottom-10 left-1/2 w-32 h-32 rotate-12 text-white" />
              <Zap className="absolute top-1/2 right-1/3 w-20 h-20 -rotate-12 text-white" />
            </div>

            {!isCategoryPlaying && !isCategoryGameOver ? (
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight mb-8 text-white">
                  Category <span className="text-[#ffb38a]">Guessing</span>
                </h1>
                <p className="text-white/80 text-lg mb-12 max-w-md mx-auto">
                  {lang === 'th' ? 'ระบบจะสุ่มหมวดหมู่ขึ้นมา คุณมีเวลา 5 วินาทีในการพูดคำศัพท์ในหมวดหมู่นั้นแล้วกดปุ่ม' : 'A random category will appear. You have 5 seconds to name something in that category and press the button.'}
                </p>
                <button 
                  onClick={startCategoryGame}
                  className="px-12 py-4 rounded-full bg-[#ffb38a] text-black hover:bg-white active:scale-[0.98] font-bold text-xl transition-all shadow-[0_0_30px_rgba(255,179,138,0.3)]"
                >
                  {lang === 'th' ? 'เริ่มเกม' : 'Start Game'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
                <div className="text-center mb-16">
                  <div className="text-[#ffb38a] text-sm font-bold tracking-widest uppercase mb-4">
                    {lang === 'th' ? 'หมวดหมู่ปัจจุบัน' : 'Current Category'}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold text-white break-words">
                    {currentCategory}
                  </h2>
                </div>
                
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-8 md:mb-16">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="48" 
                      fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" 
                    />
                    <circle 
                      cx="50" cy="50" r="48" 
                      fill="none" stroke="#ffb38a" strokeWidth="4" 
                      strokeDasharray="301.59" 
                      strokeDashoffset={`${(1 - timeLeft / 5) * 301.59}`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="text-7xl md:text-8xl font-black text-white">
                    {timeLeft}
                  </div>
                </div>

                <button 
                  onClick={handleCategoryNext}
                  className="w-full max-w-sm py-6 rounded-2xl bg-white text-black hover:bg-gray-100 active:scale-[0.98] font-bold text-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  {lang === 'th' ? 'ถัดไป' : 'Next'}
                </button>
              </div>
            )}
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-4 md:pb-8 z-20 gap-8 min-h-0 relative">
            {/* Background Icons for Sync or Drink */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] z-0">
              <MessageCircle className="absolute top-1/4 left-10 w-48 h-48 -rotate-12 text-white" />
              <MessageCircle className="absolute bottom-1/4 right-10 w-48 h-48 rotate-12 text-white scale-x-[-1]" />
            </div>

            {!isSyncPlaying ? (
              <div className="text-center z-10">
                <h1 className="text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight mb-8 text-white">
                  {lang === 'th' ? 'พูดตรง' : 'Sync or'}<br/><span className="text-[#ffb38a]">{lang === 'th' ? 'รอดกิน' : 'Drink'}</span>
                </h1>
                
                <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 mb-12 max-w-md mx-auto text-left backdrop-blur-sm">
                  <h3 className="text-[#ffb38a] font-bold text-lg mb-4">{lang === 'th' ? 'วิธีเล่น:' : 'How to play:'}</h3>
                  <ol className="text-white/80 space-y-3 text-sm md:text-base list-decimal list-inside">
                    {lang === 'th' ? (
                      <>
                        <li>ระบบจะสุ่มคำขึ้นมา 1 คำ เช่น "ข้าว"</li>
                        <li>ผู้เล่นทั้ง 2 คนต้องคิดคำมาต่อให้ได้ 2 พยางค์ (เช่น ข้าวผัด, ข้าวหอม)</li>
                        <li>พูดคำนั้นออกมาพร้อมกัน</li>
                        <li>ถ้าพูดไม่เหมือนกัน... <strong className="text-white">ดื่ม!</strong></li>
                      </>
                    ) : (
                      <>
                        <li>A base word will appear (e.g., "Sun")</li>
                        <li>Both players think of a word to combine with it (e.g., Sunflower, Sunset)</li>
                        <li>Say the combined word out loud at the same time</li>
                        <li>If the words don't match... <strong className="text-white">Drink!</strong></li>
                      </>
                    )}
                  </ol>
                </div>

                <button 
                  onClick={startSyncGame}
                  className="px-12 py-4 rounded-full bg-[#ffb38a] text-black hover:bg-white active:scale-[0.98] font-bold text-xl transition-all shadow-[0_0_30px_rgba(255,179,138,0.3)]"
                >
                  {lang === 'th' ? 'เริ่มเกม' : 'Start Game'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full z-10">
                <div className="text-center mb-16">
                  <div className="text-[#ffb38a] text-sm font-bold tracking-widest uppercase mb-4">
                    {lang === 'th' ? 'คำศัพท์' : 'Base Word'}
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black text-white break-words">
                    {currentSyncWord}
                  </h2>
                  <p className="text-white/60 mt-8 text-lg">
                    {lang === 'th' ? 'พูดคำที่ต่อจากคำนี้พร้อมกันใน 3... 2... 1...' : 'Say a word that combines with this in 3... 2... 1...'}
                  </p>
                </div>

                <button 
                  onClick={handleSyncNext}
                  className="w-full max-w-sm py-6 rounded-2xl bg-white text-black hover:bg-gray-100 active:scale-[0.98] font-bold text-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  {lang === 'th' ? 'คำต่อไป' : 'Next Word'}
                </button>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Game Over Popup */}
      <AnimatePresence>
        {gameMode === 'spill' && gameState === 'gameover' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-gradient-to-b from-[#8c3314] to-[#4a1705] border border-[#ffb38a]/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
              <h2 className="text-4xl font-black text-white mb-8">{lang === 'th' ? 'ล้นแล้ว!' : 'Overflow!'}</h2>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={startGame}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#ffb38a] text-black hover:bg-white active:scale-[0.98] font-bold text-lg"
                >
                  <RotateCcw size={20} />
                  {lang === 'th' ? 'เล่นอีกครั้ง' : 'Play Again'}
                </button>
                <button 
                  onClick={resetToMenu}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-black/20 text-white hover:bg-black/40 border border-white/10 active:scale-[0.98] font-medium text-lg"
                >
                  {lang === 'th' ? 'เปลี่ยนแก้ว' : 'Change Glass'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Game Over Popup */}
      <AnimatePresence>
        {gameMode === 'category' && isCategoryGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-gradient-to-b from-[#8c3314] to-[#4a1705] border border-[#ffb38a]/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
            >
              <h2 className="text-4xl font-black text-white mb-4">{lang === 'th' ? 'หมดเวลา!' : "Time's Up!"}</h2>
              <p className="text-white/80 mb-8">{lang === 'th' ? 'คุณนึกคำศัพท์ไม่ทันในหมวดหมู่:' : 'You failed to name something in:'} <br/><strong className="text-white text-xl">{currentCategory}</strong></p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={startCategoryGame}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#ffb38a] text-black hover:bg-white active:scale-[0.98] font-bold text-lg"
                >
                  <RotateCcw size={20} />
                  {lang === 'th' ? 'เล่นอีกครั้ง' : 'Play Again'}
                </button>
                <button 
                  onClick={() => setIsCategoryGameOver(false)}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-black/20 text-white hover:bg-black/40 border border-white/10 active:scale-[0.98] font-medium text-lg"
                >
                  {lang === 'th' ? 'ออก' : 'Quit'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
