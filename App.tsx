
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';

export type ViewType = 'home' | 'about' | 'gallery' | 'services' | 'contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Pomik na vrh ob menjavi strani in upravljanje gumba za vrh
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

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
            <Contact />
          </div>
        );
      case 'about':
        return <div className="pt-20 animate-in fade-in duration-500"><About onNavigate={setCurrentView} /></div>;
      case 'gallery':
        return <div className="pt-20 animate-in fade-in duration-500"><Gallery /></div>;
      case 'services':
        return <div className="pt-20 animate-in fade-in duration-500"><Services onNavigate={setCurrentView} /></div>;
      case 'contact':
        return <div className="pt-20 animate-in fade-in duration-500"><Contact /></div>;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-zinc-700 selection:text-white flex flex-col relative">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentView} />

      {/* Floating Back to Top Button */}
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
