
import React, { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { ViewType, Language } from '../App';
import { translations } from '../translations';

interface PrivacyPolicyProps {
  onNavigate: (view: ViewType) => void;
  lang: Language;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-24 md:py-40 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors mb-16 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t.privacy.back}
        </button>

        <div className="space-y-16">
          <header>
            <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] mb-4 block">{t.privacy.badge}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t.privacy.titleMain} <span className="font-serif italic font-normal text-zinc-400">{t.privacy.titleItalic}</span></h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase">{t.privacy.lastUpdate}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
            {t.privacy.sections.slice(0, 2).map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                  {section.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {t.privacy.sections.slice(2).map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">{section.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/50 border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-zinc-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-zinc-200">{t.privacy.questions}</h4>
                <p className="text-zinc-500 text-xs">{t.privacy.subQuestions}</p>
              </div>
            </div>
            <a 
              href="mailto:info@zkphotolab.si" 
              className="px-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all text-center min-w-[200px]"
            >
              {t.privacy.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
