
import React, { useState, useEffect } from 'react';
import { X, Maximize2, Loader2 } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

const Gallery: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [filter, setFilter] = useState('Vse');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setWorks(data.works);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products.json", err);
        setLoading(false);
      });
  }, []);

  const categories = ['Vse', ...new Set(works.map(w => w.category))];
  const filteredWorks = filter === 'Vse' ? works : works.filter(w => w.category === filter);

  const openLightbox = (work: Work) => {
    setSelectedWork(work);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedWork(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-zinc-600" size={32} />
      </div>
    );
  }

  return (
    <section id="gallery" className="py-24 bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] mb-4 block">Portfelj</span>
            <h2 className="text-4xl font-bold tracking-tight uppercase">
              IZBRANA <span className="font-serif italic font-normal text-zinc-400">DELA.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 outline-none ${
                  filter === cat ? 'text-white border-b border-white pb-1' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div 
              key={work.id} 
              onClick={() => openLightbox(work)}
              className="relative group overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/5 cursor-pointer"
            >
              <img 
                src={work.image} 
                alt={work.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 mb-2">{work.category}</span>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold tracking-widest uppercase">{work.title}</h3>
                    <p className="text-[10px] text-zinc-500 mt-2 tracking-[0.3em]">{work.year}</p>
                  </div>
                  <Maximize2 size={16} className="text-white/40 mb-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedWork && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
          onClick={closeLightbox}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
            <X size={32} />
          </button>
          <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedWork.image} 
              alt={selectedWork.title}
              className="max-w-full max-h-[85vh] object-contain shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            />
            <div className="text-center">
              <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] mb-2 block">{selectedWork.category}</span>
              <h3 className="text-2xl font-bold tracking-widest uppercase mb-1">{selectedWork.title}</h3>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">{selectedWork.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
