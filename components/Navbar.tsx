import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { ViewType } from '../App';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; id: ViewType }[] = [
    { name: 'Domov', id: 'home' },
    { name: 'O meni', id: 'about' },
    { name: 'Dela', id: 'gallery' },
    { name: 'Storitve', id: 'services' },
    { name: 'Kontakt', id: 'contact' },
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

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavClick(link.id)}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors outline-none ${
                currentView === link.id ? 'text-white font-bold' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <a 
            href="https://www.instagram.com/zkphotolab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>

        <button 
          className="md:hidden text-zinc-100 outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
                currentView === link.id ? 'text-white' : 'text-zinc-600'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="mt-8 h-[1px] w-12 bg-zinc-800"></div>
          <a 
            href="https://www.instagram.com/zkphotolab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;