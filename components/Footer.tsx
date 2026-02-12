
import React from 'react';
import { Instagram, ArrowUp } from 'lucide-react';
import { ViewType } from '../App';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { name: string; id: ViewType }[] = [
    { name: 'Domov', id: 'home' },
    { name: 'O meni', id: 'about' },
    { name: 'Dela', id: 'gallery' },
    { name: 'Storitve', id: 'services' },
    { name: 'Kontakt', id: 'contact' },
  ];

  return (
    <footer className="py-12 bg-black border-t border-white/5 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
             <button onClick={() => onNavigate('home')} className="flex items-center gap-2 mb-2 outline-none">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                  <span className="font-bold text-sm tracking-tighter">ZK</span>
                </div>
                <span className="font-medium tracking-[0.3em] text-[10px] uppercase">Photolab</span>
             </button>
             <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-2">© 2025 ZK Photolab. Vse pravice pridržane.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
             {navItems.map(item => (
               <button 
                 key={item.id} 
                 onClick={() => onNavigate(item.id)}
                 className="hover:text-white transition-colors outline-none"
               >
                 {item.name}
               </button>
             ))}
          </div>

          <button 
            onClick={scrollToTop}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group outline-none"
          >
            <ArrowUp size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="flex justify-center border-t border-white/5 pt-8">
           <a 
            href="https://www.instagram.com/zkphotolab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Instagram size={14} />
            <span className="text-[10px] uppercase tracking-[0.2em]">Sledi na Instagramu</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;