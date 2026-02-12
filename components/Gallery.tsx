
import React, { useState, useRef } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  category: string;
  url: string;
  title: string;
  year: string;
}

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Vse');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['Vse', 'Urban & Street', 'Lifestyle & Details'];

  const photos: Photo[] = [
    { id: 1, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/u/0/d/13Ogvsxrq-LJZe5y_0N5v-Hloj_Aj8g-C', title: 'Urbana Vizija', year: '2024' },
    { id: 2, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/u/0/d/18N-XBLPJKAUP6UE1wwGwUs827zuziHZz', title: 'Zimski Detajl I', year: '2024' },
    { id: 3, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/u/0/d/1GrcpMnjVntL-xqs6yWeORoYKa48WlcWO', title: 'Mestna Arhitektura', year: '2023' },
    { id: 4, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/u/0/d/1O_o1dPGd2zaIuINCM4FNaxsXSHDSgmP-', title: 'Zimski Detajl II', year: '2024' },
    { id: 5, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/u/0/d/1Ta4RmUNYkvSrikV7LQDBE717Cqc3ucYK', title: 'Geometrija mesta', year: '2024' },
    { id: 6, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/u/0/d/1U3mngz2yFoBILEL_VLT-Li7WLNRjHbNS', title: 'Odmev ulice', year: '2023' },
    { id: 7, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/u/0/d/1WxJCJwQuVC-YsbqnyFKiSbZ89320LiXe', title: 'Tekstura vsakdana', year: '2024' },
    { id: 8, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/u/0/d/1_gkmO_Fq2m5FSb_NPUISSIVxTgESPzNH', title: 'Mestni okvir', year: '2023' },
    { id: 9, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/u/0/d/1d2hwFFur7oQclX3Fvugq9zm_hAacSbBq', title: 'Atmosfera', year: '2024' },
    { id: 10, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/1-4dI0iBreAZmg8WHRAlEcDjL4q274vWC', title: 'Mestni Fragment I', year: '2024' },
    { id: 11, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/114Vbox1gjMlvTVOl4kyGNS9xdQkwPgMU', title: 'Linije mesta', year: '2024' },
    { id: 12, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/125aLggNiF4ZLLlioJBYVVO3h2ixLDkkf', title: 'Zimski Minimalizem', year: '2024' },
    { id: 13, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/147ObkddLLQgZAwTsxFQRnxjIPo8Xgr5L', title: 'Arhitekturni Ritmi', year: '2024' },
    { id: 14, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/181RfbfgxH3vIUsEV8-EGq391MCivE-c5', title: 'Naravni Kontrast', year: '2024' },
    { id: 15, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/19x_02ObWWuJ5QfH1msCCdVKjzco2isfu', title: 'Mestna Silhueta', year: '2024' },
    { id: 16, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/1WoVvYGCZuC_AidovDQR9I_F2MV0hd2lw', title: 'Strukturni Dialog', year: '2024' },
    { id: 17, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/1Xif0jlXsYDWQHknc0afgIURpI3MwXmaO', title: 'Mestni Prehod', year: '2024' },
    { id: 18, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/1wNNDsEBNWRaq4yOMeVS41aRW9k3BItVJ', title: 'Perspektiva Ulice', year: '2024' },
    { id: 19, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/1yUXozLgDbZMKwudVBzrG1ovZNZN60Pga', title: 'Trenutek Miru', year: '2024' },
    { id: 20, category: 'Urban & Street', url: 'https://lh3.googleusercontent.com/d/109_3LHQRkkZgYZOYZbBVrlX5Z488LNGn', title: 'Urbana Kompozicija', year: '2024' },
    { id: 21, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/1EM5T6ZriZjhF0J1n8AK12pQrpvOGGZyP', title: 'Abstrakcija I', year: '2024' },
    { id: 22, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/1KDfa6aUel-Q9_z9jMoHWaamtaeHpd2GE', title: 'Fokus na Detajl', year: '2024' },
    { id: 23, category: 'Lifestyle & Details', url: 'https://lh3.googleusercontent.com/d/1L4EiTxkdTaBQCxzAO169zIk3aErZJ0oQ', title: 'Abstrakcija II', year: '2024' }
  ];

  const filteredPhotos = filter === 'Vse' ? photos : photos.filter(p => p.category === filter);
  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPhotos = filteredPhotos.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current) {
      const offset = 80; 
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-[#0d0d0d] text-white">
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
                  filter === cat ? 'text-white border-b border-white pb-1' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative cursor-pointer animate-in fade-in zoom-in-95 duration-700"
              onClick={() => openLightbox(photo)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 relative">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Maximize2 className="text-white" size={24} />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-start opacity-60 group-hover:opacity-100 transition-opacity">
                <div>
                   <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{photo.title}</h3>
                   <span className="text-[9px] uppercase tracking-widest text-zinc-600">{photo.category}</span>
                </div>
                <span className="text-[9px] font-serif italic text-zinc-500">{photo.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Prejšnja stran"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-12 h-12 text-[10px] font-bold uppercase tracking-widest transition-all ${
                      currentPage === pageNum 
                        ? 'bg-white text-black' 
                        : 'border border-white/10 text-zinc-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Naslednja stran"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-700">
              Stran {currentPage} od {totalPages}
            </p>
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 transition-all duration-500 animate-in fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-[80vh] flex items-center justify-center">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500"
              />
            </div>
            <div className="text-center">
              <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] mb-2 block">{selectedPhoto.category}</span>
              <h3 className="text-2xl font-bold tracking-widest uppercase mb-1">{selectedPhoto.title}</h3>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">{selectedPhoto.year}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
