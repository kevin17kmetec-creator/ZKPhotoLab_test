
import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface Photo {
  id: string;
  url: string;
  title: string;
  year?: string;
}

interface GalleryProps {
  lang: Language;
  isSubpage?: boolean;
}

const API_KEY = 'AIzaSyCF5w1vbVPrMy0QKOCq7f0ljMaFx3-tMsw';
const FOLDER_ID = '1NngDKCrXY4EpvB6RDPk85sKcregG4fc9';

const Gallery: React.FC<GalleryProps> = ({ lang, isSubpage = false }) => {
  const t = translations[lang];
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const sectionRef = useRef<HTMLElement>(null);
  // Na glavni strani 8 slik, na podstrani 10
  const itemsPerPage = isSubpage ? 10 : 8;

  useEffect(() => {
    fetchPhotosFromDrive();
  }, []);

  const fetchPhotosFromDrive = async () => {
    setLoading(true);
    setError(false);
    try {
      const query = encodeURIComponent(`'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`);
      // Dodan parameter orderBy=createdTime desc za razvrščanje od najnovejše do najstarejše
      const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime%20desc&key=${API_KEY}&fields=files(id,name,createdTime,mimeType)&supportsAllDrives=true&includeItemsFromAllDrives=true&pageSize=100`;

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Google Drive API Error Response:', errorBody);
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.files || data.files.length === 0) {
        setPhotos([]);
        return;
      }
      
      const drivePhotos: Photo[] = data.files.map((file: any) => ({
        id: file.id,
        url: `https://lh3.googleusercontent.com/u/0/d/${file.id}`,
        title: file.name.split('.')[0].replace(/[-_]/g, ' '),
        year: new Date(file.createdTime).getFullYear().toString()
      }));

      setPhotos(drivePhotos);
    } catch (err) {
      console.error('Error fetching Google Drive images:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current) {
      // Pomik na vrh galerije (napis Portfelj / Izbrana dela)
      const headerOffset = 100;
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalPages = Math.ceil(photos.length / itemsPerPage);
  const paginatedPhotos = photos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-[#0d0d0d] text-white min-h-[600px]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-zinc-400 uppercase tracking-[0.5em] text-[10px] mb-4 block">{t.gallery.badge}</span>
            <h2 className="text-4xl font-bold tracking-tight uppercase">
              {t.gallery.titleMain} <span className="font-serif italic font-normal text-zinc-400">{t.gallery.titleItalic}</span>
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-zinc-500" size={32} />
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">{t.gallery.loading}</p>
          </div>
        ) : error ? (
          <div className="text-center py-40 bg-zinc-900/20 border border-white/5 rounded-lg">
            <p className="text-zinc-500 uppercase tracking-widest text-xs mb-4">{t.gallery.error}</p>
            <button 
              onClick={fetchPhotosFromDrive}
              className="text-[9px] uppercase tracking-widest text-white border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
            >
              Poskusi ponovno / Retry
            </button>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-40">
            <p className="text-zinc-500 uppercase tracking-widest text-xs">V tej mapi trenutno ni slik. / No images found.</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isSubpage ? 'lg:grid-cols-2' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-4 md:gap-6 animate-in fade-in duration-700`}>
              {paginatedPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group relative cursor-pointer overflow-hidden bg-zinc-900 border border-white/5"
                  onClick={() => openLightbox(photo)}
                >
                  <div className="aspect-[4/5] relative">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('drive.google.com/thumbnail')) {
                           target.src = `https://drive.google.com/thumbnail?id=${photo.id}&sz=w1000`;
                        } else {
                           target.src = 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Maximize2 className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                     <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white truncate">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 text-[10px] uppercase font-bold tracking-widest transition-all border ${
                          currentPage === i + 1 
                            ? 'bg-white text-black border-white' 
                            : 'text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">
                  {t.gallery.page} {currentPage} {t.gallery.of} {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 transition-all duration-500 animate-in fade-in cursor-default"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Zapri"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center gap-6 cursor-default"
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://drive.google.com/thumbnail?id=${selectedPhoto.id}&sz=w2000`;
                }}
              />
            </div>
            <div 
              className="text-center absolute bottom-4 md:bottom-10 bg-black/50 backdrop-blur-md px-6 py-3 border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold tracking-widest uppercase mb-1">{selectedPhoto.title}</h3>
              {selectedPhoto.year && <p className="text-zinc-500 text-[9px] uppercase tracking-[0.3em]">{selectedPhoto.year}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
