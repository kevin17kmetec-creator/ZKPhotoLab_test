
import React from 'react';
import { Camera, MapPin, Layers, ArrowRight } from 'lucide-react';
import { ViewType } from '../App';

interface ServicesProps {
  onNavigate: (view: ViewType) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const services = [
    {
      id: '01',
      title: 'Urbana Fotografija',
      desc: 'Vizualna vsebina za blagovne znamke v mestnem okolju. Poudarek na arhitekturi, utripu mesta in geometriji.',
      icon: <MapPin className="text-zinc-400" size={24} />
    },
    {
      id: '02',
      title: 'Lifestyle Portreti',
      desc: 'Fotografiranje posameznikov v naravni svetlobi z avtentičnim pridihom. Iskanje spontanih trenutkov in naravnih interakcij.',
      icon: <Camera className="text-zinc-400" size={24} />
    },
    {
      id: '03',
      title: 'Editorial',
      desc: 'Konceptualna fotografija za revije ali digitalne publikacije. Pripovedovanje zgodb skozi premišljene kompozicije.',
      icon: <Layers className="text-zinc-400" size={24} />
    }
  ];

  return (
    <section id="services" className="pt-24 md:pt-40 pb-12 md:pb-20 border-y border-white/5 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <div>
            <span className="text-zinc-400 uppercase tracking-[0.5em] text-[10px] mb-4 block">Ponudba</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 uppercase">
              USTVARJANJE <br />
              <span className="font-serif italic font-normal text-zinc-400">VIZIJE.</span>
            </h2>
            
            <button 
              onClick={() => onNavigate('contact')}
              className="mt-6 px-10 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all flex items-center gap-4 group"
            >
              Povpraševanje
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col justify-center gap-12">
            {services.map((service) => (
              <div key={service.id} className="group border-b border-white/5 pb-10 last:border-0 cursor-pointer" onClick={() => onNavigate('contact')}>
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-6">
                      <span className="text-[10px] font-bold text-zinc-500 tracking-tighter">/ {service.id}</span>
                      <h3 className="text-xl font-bold tracking-widest uppercase group-hover:text-white transition-colors">{service.title}</h3>
                   </div>
                   <div className="opacity-40 group-hover:opacity-100 transition-opacity">{service.icon}</div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed ml-12 max-w-lg">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
