
import React, { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { ViewType } from '../App';

interface PrivacyPolicyProps {
  onNavigate: (view: ViewType) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
          Nazaj na prvo stran
        </button>

        <div className="space-y-16">
          <header>
            <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] mb-4 block">Pravno obvestilo</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">POLITIKA <span className="font-serif italic font-normal text-zinc-400">ZASEBNOSTI.</span></h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase">Zadnja posodobitev: Marec 2025</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                Upravljavec podatkov
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Žiga Kučiš - ZK Photolab<br />
                Slovenija
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                Katere podatke zbiramo
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Zbiramo izključno podatke, ki jih prostovoljno vnesete v kontaktni obrazec: ime in priimek ter elektronski naslov.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Namen obdelave</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Vaše osebne podatke obdelujemo izključno za namen komunikacije z vami (odgovor na vaše povpraševanje) in pripravo ponudb za fotografske storitve. Brez vaše dodatne privolitve podatkov ne bomo uporabljali za namene neposrednega trženja ali pošiljanja e-novic.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Hramba podatkov</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Podatke hranimo toliko časa, kolikor je potrebno za izpolnitev namena (npr. do zaključka projekta ali konca komunikacije) ali dokler ne zahtevate njihovega izbrisa.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Vaše pravice</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Skladno z GDPR in ZVOP-2 imate pravico do vpogleda, popravka, izbrisa ali omejitve obdelave vaših podatkov. Svojo privolitev lahko kadarkoli prekličete s sporočilom na naš kontaktni naslov.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-200">Varnost in deljenje podatkov</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Zagotavljamo, da vaših podatkov ne bomo posredovali tretjim osebam ali jih prodajali. Uporabljamo ustrezne tehnične in organizacijske ukrepe za zaščito vaših podatkov pred nepooblaščenim dostopom.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-zinc-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-zinc-200">Vprašanja?</h4>
                <p className="text-zinc-500 text-xs">Za vsa vprašanja glede zasebnosti smo na voljo.</p>
              </div>
            </div>
            <a 
              href="mailto:info@zkphotolab.si" 
              className="px-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all text-center min-w-[200px]"
            >
              Kontaktiraj me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
