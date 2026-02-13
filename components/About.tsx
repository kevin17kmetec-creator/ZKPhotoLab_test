
import React from 'react';
import { ViewType, Language } from '../App';
import { ArrowRight } from 'lucide-react';
import { translations } from '../translations';

interface AboutProps {
  onNavigate: (view: ViewType) => void;
  lang: Language;
  isCompact?: boolean;
}

const About: React.FC<AboutProps> = ({ onNavigate, lang, isCompact = false }) => {
  const t = translations[lang];

  return (
    <section id="about" className={`py-24 md:py-40 bg-[#0a0a0a] ${isCompact ? '' : 'min-h-[80vh]'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5">
              <img 
                src="https://lh3.googleusercontent.com/u/0/d/1Rh6SJriQABe_vjJHYxUROR4JLE3-AHhf" 
                alt={t.about.name} 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-56 border border-white/5 bg-[#0a0a0a] p-8 hidden md:flex flex-col justify-end">
              <span className="text-3xl font-serif italic mb-2">{t.about.name}</span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 leading-relaxed">
                {t.about.brand}
              </p>
            </div>
          </div>

          <div>
            <span className="text-zinc-400 uppercase tracking-[0.5em] text-[10px] mb-6 block">{t.about.badge}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 uppercase">
              {t.about.titleMain} <br /> <span className="font-serif italic font-normal text-zinc-400">{t.about.titleItalic}</span>
            </h2>
            <div className="space-y-6 text-zinc-300 text-sm leading-loose max-w-lg">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              
              {!isCompact ? (
                <p>{t.about.p3}</p>
              ) : (
                <button 
                  onClick={() => onNavigate('about')}
                  className="mt-8 flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.3em] group"
                >
                  {t.about.readMore}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <div className="pt-8 flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-zinc-700"></div>
                 <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em]">{t.about.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
