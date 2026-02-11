
import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface Photo {
  id: number;
  category: string;
  url: string;
  title: string;
  year: string;
}

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Vse');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const itemsPerPage = 10;

  const categories = ['Vse', 'Urban & Street', 'Lifestyle & Details'];

  // Vsi podatki so zapisani neposredno tukaj (hardcoded)
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
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPhotos = filteredPhotos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {currentPhotos.map((photo) => (
            <div 
              key={photo.id} 
              onClick={() => openLightbox(photo)}
              className="relative group overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/5 cursor-pointer"
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 pointer-events-none">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 mb-2">{photo.category}</span>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold tracking-widest uppercase">{photo.title}</h3>
                    <p className="text-[10px] text-zinc-500 mt-2 tracking-[0.3em]">{photo.year}</p>
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
          Prikazano {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPhotos.length)} od {filteredPhotos.length}
        </div>
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 transition-all duration-500"
          onClick={closeLightbox}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
            <X size={32} />
          </button>
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            />
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
