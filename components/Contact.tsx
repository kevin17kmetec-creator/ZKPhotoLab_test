
import React, { useState } from 'react';
import { Mail, Instagram, Send, Check } from 'lucide-react';
import { ViewType } from '../App';

interface ContactProps {
  onNavigate?: (view: ViewType) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="pt-12 md:pt-20 pb-24 md:pb-40 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-zinc-400 uppercase tracking-[0.5em] text-xs mb-4 block">Kontakt</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              ZAČNIMO <span className="font-serif italic font-normal">PROJEKT.</span>
            </h2>
            
            <div className="space-y-12 mt-16">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1">E-pošta</h4>
                  <p className="text-zinc-200">zigakucis13@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1">Social</h4>
                  <a href="https://www.instagram.com/zkphotolab" target="_blank" className="text-zinc-200 hover:text-white transition-colors underline decoration-white/20 underline-offset-4">@zkphotolab</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-8 md:p-12 border border-white/5">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-sm">Pošlji povpraševanje</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400">Ime in Priimek</label>
                <input 
                  required
                  type="text" 
                  placeholder="Janez Novak"
                  className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400">E-naslov</label>
                  <input 
                    required
                    type="email" 
                    placeholder="janez@example.com"
                    className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400">Tip Projekta</label>
                  <select className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100 appearance-none">
                    <option>Urbana Fotografija</option>
                    <option>Lifestyle Portret</option>
                    <option>Editorial</option>
                    <option>Drugo</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400">Sporočilo</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Opišite vašo vizijo..."
                  className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                ></textarea>
              </div>

              {/* GDPR Consent Checkbox */}
              <div className="flex items-start gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="gdpr-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-black border-white/20 rounded accent-white cursor-pointer"
                />
                <label htmlFor="gdpr-consent" className="text-[10px] leading-relaxed text-zinc-400 tracking-wide cursor-pointer">
                  Strinjam se z obdelavo mojih osebnih podatkov za namen odgovora na moje povpraševanje v skladu s{' '}
                  <button 
                    type="button"
                    onClick={() => onNavigate && onNavigate('privacy')}
                    className="underline decoration-white/20 underline-offset-2 hover:text-white transition-colors"
                  >
                    Politiko zasebnosti
                  </button>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={status !== 'idle' || !consent}
                className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${
                  status === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-400'
                }`}
              >
                {status === 'idle' && <>Pošlji sporočilo <Send size={14} /></>}
                {status === 'sending' && "Pošiljanje..."}
                {status === 'success' && <>Poslano <Check size={14} /></>}
              </button>

              {/* Informational Text */}
              <p className="text-[9px] leading-relaxed text-zinc-500 tracking-wider text-justify mt-6">
                Vaše podatke (ime in e-naslov) bomo uporabili izključno za komunikacijo z vami glede vašega povpraševanja. Podatkov ne bomo delili s tretjimi osebami ali jih uporabljali za namene oglaševanja brez vaše dodatne privolitve. Svojo privolitev lahko kadarkoli prekličete s sporočilom na <span className="text-zinc-400">info@zkphotolab.si</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
