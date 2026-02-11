
import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface Product {
  id: number;
  category: string;
  image: string;
  title: string;
  year: string;
}

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Vse');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const itemsPerPage = 10;

  const categories = ['Vse', 'Urban & Street', 'Lifestyle & Details'];

  // Podatki so ročno zapisani v kodo (hardcoded), da se izognemo 404 napakam
  const products: Product[] = [
    { id: 1, category: 'Urban & Street', image: './slika1.jpg', title: 'Urbana Vizija', year: '2024' },
    { id: 2, category: 'Lifestyle & Details', image: './slika2.jpg', title: 'Zimski Detajl I', year: '2024' },
    { id: 3, category: 'Urban & Street', image: './slika3.jpg', title: 'Mestna Arhitektura', year: '2023' },
    { id: 4, category: 'Lifestyle & Details', image: './slika4.jpg', title: 'Zimski Detajl II', year: '2024' },
    { id: 5, category: 'Urban & Street', image: './slika5.jpg', title: 'Geometrija mesta', year: '2024' },
    { id: 6, category: 'Urban & Street', image: './slika6.jpg', title: 'Odmev ulice', year: '2023' },
    { id: 7, category: 'Lifestyle & Details', image: './slika7.jpg', title: 'Tekstura vsakdana', year: '2024' },
    { id: 8, category: 'Urban & Street', image: './slika8.jpg', title: 'Mestni okvir', year: '2023' },
    { id: 9, category: 'Lifestyle & Details', image: './slika9.jpg', title: 'Atmosfera', year: '2024' },
    { id: 10, category: 'Urban & Street', image: './slika10.jpg', title: 'Mestni Fragment I', year: '2024' },
    { id: 11, category: 'Urban & Street', image: './slika11.jpg', title: 'Linije mesta', year: '2024' },
    { id: 12, category: 'Lifestyle & Details', image: './slika12.jpg', title: 'Zimski Minimalizem', year: '2024' },
    { id: 13, category: 'Urban & Street', image: './slika13.jpg', title: 'Arhitekturni Ritmi', year: '2024' },
    { id: 14, category: 'Lifestyle & Details', image: './slika14.jpg', title: 'Naravni Kontrast', year: '2024' },
    { id: 15, category: 'Urban & Street', image: './slika15.jpg', title: 'Mestna Silhueta', year: '2024' },
    { id: 16, category: 'Urban & Street', image: './slika16.jpg', title: 'Strukturni Dialog', year: '2024' },
    { id: 17, category: 'Urban & Street', image: './slika17.jpg', title: 'Mestni Prehod', year: '2024' },
    { id: 18, category: 'Urban & Street', image: './slika18.jpg', title: 'Perspektiva Ulice', year: '2024' },
    { id: 19, category: 'Lifestyle & Details', image: './slika19.jpg', title: 'Trenutek Miru', year: '2024' },
    { id: 20, category: 'Urban & Street', image: './slika20.jpg', title: 'Urbana Kompozicija', year: '2024' },
    { id: 21, category: 'Lifestyle & Details', image: './slika21.jpg', title: 'Abstrakcija I', year: '2024' },
    { id: 22, category: 'Lifestyle & Details', image: './slika22.jpg', title: 'Fokus na Detajl', year: '2024' },
    { id: 23, category: 'Lifestyle & Details', image: './slika23.jpg', title: 'Abstrakcija II', year: '2024' },
    { id: 24, category: 'Urban & Street', image: './slika24.jpg', title: 'Mestni Utrip', year: '2024' },
    { id: 25, category: 'Lifestyle & Details', image: './slika25.jpg', title: 'Večerni Detajl', year: '2024' }
  ];

  const filteredProducts = filter === 'Vse' ? products : products.filter(p => p.category === filter);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const section = document.getElementById('gallery');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  const openLightbox = (product: Product) => {
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
            <h2 className="text-4xl font-bold tracking-tight uppercase">IZBRANA <span className="font-serif italic font-normal text-zinc-400">DELA.</span></h2>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-12 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap ${
                  filter === cat ? 'text-white border-b border-white pb-1' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {currentProducts.map((product) => (
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
                onError={(e) => {
                  // Fallback na placeholder v primeru, da lokalna slika ne obstaja
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x1000/1a1a1a/333333?text=${product.title.replace(/ /g, '+')}`;
                }}
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

        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`w-12 h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  currentPage === number 
                    ? 'bg-white text-black border-white' 
                    : 'text-zinc-500 border-white/10 hover:border-white/40'
                }`}
              >
                {String(number).padStart(2, '0')}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-zinc-600 text-[10px] uppercase tracking-[0.4em]">
          Prikazano {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} od {filteredProducts.length}
        </div>
      </div>

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 transition-all duration-500"
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
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x1600/1a1a1a/333333?text=${selectedProduct.title.replace(/ /g, '+')}`;
              }}
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
