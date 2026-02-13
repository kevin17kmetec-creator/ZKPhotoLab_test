
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { ViewType, Language } from '../App';
import { translations } from '../translations';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; id: ViewType }[] = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.gallery, id: 'gallery' },
    { name: t.nav.services, id: 'services' },
    { name: t.nav.contact, id: 'contact' },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || currentView !== 'home' ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 group outline-none">
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <span className="font-bold text-xl tracking-tighter">ZK</span>
          </div>
          <span className="font-medium tracking-widest text-sm uppercase hidden sm:block">Photolab</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors outline-none ${
                currentView === link.id ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          
          {/* Vertical Separator with the same gap as links */}
          <div className="w-[1px] h-4 bg-white/10"></div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
               <button 
                onClick={() => setLang('sl')}
                className={`transition-colors ${lang === 'sl' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
               >
                 SL
               </button>
               <span className="text-zinc-600">|</span>
               <button 
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
               >
                 EN
               </button>
            </div>
            
            <a 
              href="https://www.instagram.com/zkphotolab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <button 
          className="md:hidden text-zinc-100 outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`text-2xl uppercase tracking-[0.3em] transition-all ${
                currentView === link.id ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="mt-8 h-[1px] w-12 bg-zinc-800"></div>
          
          <div className="flex items-center gap-6 text-xl font-bold tracking-widest">
               <button 
                onClick={() => { setLang('sl'); setIsMobileMenuOpen(false); }}
                className={`transition-colors ${lang === 'sl' ? 'text-white' : 'text-zinc-400'}`}
               >
                 SL
               </button>
               <button 
                onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }}
                className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-zinc-400'}`}
               >
                 EN
               </button>
          </div>

          <a 
            href="https://www.instagram.com/zkphotolab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white mt-4"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
