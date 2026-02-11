import React from 'react';
import { ViewType } from '../App';
import { ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigate: (view: ViewType) => void;
  isCompact?: boolean;
}

const About: React.FC<AboutProps> = ({ onNavigate, isCompact = false }) => {
  return (
    <section id="about" className={`py-24 md:py-40 bg-[#0a0a0a] ${isCompact ? '' : 'min-h-[80vh]'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1517503733527-571343774119?auto=format&fit=crop&q=80&w=1000" 
                alt="Žiga Kučiš" 
                className="w-full h-full object-cover filter grayscale opacity-60 hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-56 border border-white/5 bg-[#0a0a0a] p-8 hidden md:flex flex-col justify-end">
              <span className="text-3xl font-serif italic mb-2">Žiga Kučiš</span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 leading-relaxed">
                ZK PHOTOLAB
              </p>
            </div>
          </div>

          <div>
            <span className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] mb-6 block">O meni</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 uppercase">
              NEOPAŽENI <br /> <span className="font-serif italic font-normal text-zinc-400">TRENUTKI.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 text-sm leading-loose max-w-lg">
              <p>
                Sem Žiga Kučiš, fotograf, ki ustvarja pod imenom <strong className="text-zinc-200">ZK Photolab</strong>. Moje delo je posvečeno dokumentiranju neopaženih trenutkov in surovih tekstur urbanega okolja.
              </p>
              <p>
                Znamko ZK Photolab zaznamujejo globoki kontrasti, igra s sencami in izrazita cinematic atmosfera. Osredotočam se na vizualno pripovedovanje zgodb skozi detajle, ki jih mimoidoči pogosto spregledajo.
              </p>
              
              {!isCompact ? (
                <p>
                  Skozi leta raziskovanja mestnih ulic sem razvil unikaten slog, ki združuje surovo estetiko dokumentarne fotografije z močnimi kompozicijskimi elementi arhitekture. Vsak projekt je zame iskanje nove perspektive v že znanem okolju.
                </p>
              ) : (
                <button 
                  onClick={() => onNavigate('about')}
                  className="mt-8 flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.3em] group"
                >
                  Preberi več
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <div className="pt-8 flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-zinc-700"></div>
                 <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Slovenija & Tujina</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;