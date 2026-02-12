
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashIntro from './components/SplashIntro';
import PrivacyPolicy from './components/PrivacyPolicy';
import { ArrowUp } from 'lucide-react';

export type ViewType = 'home' | 'about' | 'gallery' | 'services' | 'contact' | 'privacy';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);

  // Memoize the intro completion handler to prevent SplashIntro from re-triggering 
  // its useEffect when App re-renders due to scroll events.
  const handleIntroComplete = useCallback(() => {
    setIsIntroActive(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Lock scroll when intro is active to prevent layout shifts and restart issues
  useEffect(() => {
    if (isIntroActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isIntroActive]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <Hero onNavigate={setCurrentView} />
            <About isCompact onNavigate={setCurrentView} />
            <Gallery />
            <Services onNavigate={setCurrentView} />
            <Contact onNavigate={setCurrentView} />
          </div>
        );
      case 'about':
        return <div className="pt-20 animate-in fade-in duration-500"><About onNavigate={setCurrentView} /></div>;
      case 'gallery':
        return <div className="pt-20 animate-in fade-in duration-500"><Gallery /></div>;
      case 'services':
        return <div className="pt-20 animate-in fade-in duration-500"><Services onNavigate={setCurrentView} /></div>;
      case 'contact':
        return <div className="pt-20 animate-in fade-in duration-500"><Contact onNavigate={setCurrentView} /></div>;
      case 'privacy':
        return <div className="pt-20 animate-in fade-in duration-500"><PrivacyPolicy onNavigate={setCurrentView} /></div>;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-zinc-700 selection:text-white flex flex-col relative">
      {isIntroActive && <SplashIntro onComplete={handleIntroComplete} />}
      
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className={`flex-grow transition-opacity duration-1000 ${isIntroActive ? 'opacity-100' : 'opacity-100'}`}>
        {renderContent()}
      </main>
      
      <Footer onNavigate={setCurrentView} />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-black border border-white shadow-2xl flex items-center justify-center transition-all duration-500 z-[100] ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        } hover:scale-110 active:scale-95`}
        aria-label="Nazaj na vrh"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default App;
