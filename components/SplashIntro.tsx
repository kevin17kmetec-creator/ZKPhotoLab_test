
import React, { useEffect, useState } from 'react';
import { Language } from '../App';
import { translations } from '../translations';

interface SplashIntroProps {
  onComplete: () => void;
  lang: Language;
}

const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete, lang }) => {
  const t = translations[lang];
  const [phase, setPhase] = useState<'idle' | 'flash' | 'decay' | 'message' | 'travel'>('idle');
  const [targetRect, setTargetRect] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [startRect, setStartRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const calculatePositions = () => {
      const btn = document.getElementById('hero-contact-btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const initialWidth = Math.min(vw * 0.9, 800);
      const initialHeight = 450;
      
      setStartRect({
        top: (vh - initialHeight) / 2,
        left: (vw - initialWidth) / 2,
        width: initialWidth,
        height: initialHeight
      });
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    const startTimer = setTimeout(() => setPhase('flash'), 100);
    const flashTimer = setTimeout(() => setPhase('decay'), 400);
    const messageTimer = setTimeout(() => setPhase('message'), 1200);
    
    const travelTimer = setTimeout(() => {
      calculatePositions();
      setPhase('travel');
    }, 4500);
    
    const completeTimer = setTimeout(() => onComplete(), 7500);

    return () => {
      window.removeEventListener('resize', calculatePositions);
      [startTimer, flashTimer, messageTimer, travelTimer, completeTimer].forEach(clearTimeout);
    };
  }, [onComplete]);

  const getBoxStyle = (): React.CSSProperties => {
    const isTraveling = phase === 'travel';
    
    return {
      position: 'fixed',
      top: isTraveling ? `${targetRect.top}px` : `${startRect.top}px`,
      left: isTraveling ? `${targetRect.left}px` : `${startRect.left}px`,
      width: isTraveling ? `${targetRect.width}px` : `${startRect.width}px`,
      height: isTraveling ? `${targetRect.height}px` : `${startRect.height}px`,
      
      backgroundColor: isTraveling ? 'rgba(255, 255, 255, 0)' : 'rgba(10, 10, 10, 0.9)',
      border: isTraveling ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.15)',
      opacity: isTraveling ? 0 : (phase === 'message' ? 1 : 0),
      
      transition: isTraveling 
        ? 'all 2800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 2400ms ease-in-out, border 2000ms ease-in-out' 
        : 'all 1200ms ease-out',
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      pointerEvents: 'none',
      overflow: 'hidden'
    };
  };

  return (
    <div className={`fixed inset-0 z-[999] transition-all duration-[2500ms] ${
      phase === 'flash' ? 'bg-white' : 
      phase === 'travel' ? 'bg-transparent pointer-events-none' : 'bg-[#0a0a0a]'
    }`}>
      <div 
        className={`absolute inset-0 bg-white transition-opacity ease-out ${
          phase === 'flash' ? 'opacity-100 duration-100' : 
          phase === 'decay' ? 'opacity-0 duration-[1500ms]' : 'opacity-0'
        }`} 
      />

      <div style={getBoxStyle()}>
        <div className={`text-center px-8 md:px-12 transition-all duration-1000 ${phase === 'travel' ? 'opacity-0 scale-50 blur-xl' : 'opacity-100 scale-100'}`}>
          <h2 className="text-zinc-100 font-serif italic text-4xl md:text-7xl mb-8 tracking-tighter leading-tight">
            {t.intro.message} <br />
            <span className="text-zinc-400">{t.intro.subMessage}</span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <p className="text-zinc-500 uppercase tracking-[0.6em] text-[10px] md:text-xs">
              {t.intro.cta}
            </p>
            <div className={`h-[1px] bg-zinc-700 transition-all duration-1500 ${phase === 'message' ? 'w-48' : 'w-0'}`} />
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] transition-opacity duration-[3000ms] ${
        phase === 'travel' ? 'opacity-0' : 'opacity-100'
      }`} />
    </div>
  );
};

export default SplashIntro;
