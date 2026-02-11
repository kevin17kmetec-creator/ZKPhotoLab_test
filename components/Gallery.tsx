import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

// Podatki so definirani neposredno v kodi za maksimalno hitrost in zanesljivost.
// Uporabljamo Unsplash slike, ki odražajo "Urban & Lifestyle" estetiko ZK Photolab.
const products = [
  { 
    id: 1, 
    category: 'Urban & Street', 
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000', 
    title: 'Urbana Vizija', 
    year: '2024' 
  },
  { 
    id: 2, 
    category: 'Lifestyle & Details', 
    image: 'https://images.unsplash.com/photo-1517503733527-571343774119?auto=format&fit=crop&q=80&w=1000', 
    title: 'Zimski Detajl', 
    year: '2024' 
  },
  { 
    id: 3, 
    category: 'Urban & Street', 
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1000', 
    title: 'Mestna Arhitektura', 
    year: '2023' 
  },
  { 
    id: 4, 
    category: 'Lifestyle & Details', 
    image: 'https://images.unsplash.com/photo-1505151225562-efc8e265c7c2?auto=format&fit=crop&q=80&w=1000', 
    title: 'Fokus na Trenutek', 
    year: '2024' 
  },
  { 
    id: 5, 
    category: 'Urban & Street', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', 
    title: 'Geometrija Mesta', 
    year: '2024' 
  },
  { 
    id: 6, 
    category: 'Urban & Street', 
    image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=1000', 
    title: 'Odmev Ulice', 
    year: '2023' 
  }
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Vse');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = ['Vse', 'Urban & Street', 'Lifestyle & Details'];
  const filteredProducts = filter === 'Vse' ? products : products.filter(p => p.category === filter);

  const openLightbox = (product: any) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

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
          <div className="flex flex-wrap gap-6 md:gap-12">
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
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => openLightbox(product)}
              className="relative group overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/5 cursor-pointer"
            >
              <img 
                src={product.image} 
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 mb-2">{product.category}</span>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold tracking-widest uppercase">{product.title}</h3>
                    <p className="text-[10px] text-zinc-500 mt-2 tracking-[0.3em]">{product.year}</p>
                  </div>
                  <Maximize2 size={16} className="text-white/40 mb-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
            <X size={32} />
          </button>
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            />
            <div className="text-center">
              <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] mb-2 block">{selectedProduct.category}</span>
              <h3 className="text-2xl font-bold tracking-widest uppercase mb-1">{selectedProduct.title}</h3>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">{selectedProduct.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;