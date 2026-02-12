
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ViewType } from '../App';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Rahlo prej kot SplashIntro zaključi, da se vizualno zlije (travel start 4500 + ~2000ms progresije)
    const timer = setTimeout(() => setIsReady(true), 6800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000" 
          alt="Urban Atmosphere" 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-r from-[#0a0a0a]/80 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <p className="text-zinc-300 uppercase tracking-[0.5em] text-[10px] font-bold mb-4">Žiga Kučiš | Fotograf</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[4000ms]">
            URBANA <br />
            <span className="font-serif italic font-normal text-zinc-400">ESTETIKA</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <button 
              onClick={() => onNavigate('gallery')}
              className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all flex items-center gap-3 group w-full sm:w-auto justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-[4200ms]"
            >
              Poglej dela
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Ciljni gumb - postane viden šele ob koncu animacije SplashIntro */}
            <button 
              id="hero-contact-btn"
              onClick={() => onNavigate('contact')}
              className={`px-10 py-[18.5px] border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-center min-w-[210px] ${
                isReady ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-1000`}
            >
              Kontaktiraj me
            </button>
          </div>

          <div className="mt-20 flex items-center gap-12 text-zinc-500 text-[10px] tracking-widest uppercase animate-in fade-in duration-1000 delay-[4400ms]">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-100 font-bold">Dokumentarno</span>
              <span>Urbano okolje</span>
            </div>
            <div className="hidden md:flex flex-col gap-1">
              <span className="text-zinc-100 font-bold">Lifestyle</span>
              <span>Avtentični trenutki</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 hidden md:block vertical-text tracking-[0.5em] text-zinc-600 text-[10px] uppercase">
        ZK PHOTOLAB
      </div>
    </section>
  );
};

export default Hero;
