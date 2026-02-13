
import React, { useState } from 'react';
import { Mail, Instagram, Send, Check, AlertCircle } from 'lucide-react';
import { ViewType, Language } from '../App';
import { translations } from '../translations';

interface ContactProps {
  onNavigate?: (view: ViewType) => void;
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: lang === 'sl' ? 'Urbana Fotografija' : 'Urban Photography',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    setStatus('sending');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && (result.success || result.id)) {
        setStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          type: lang === 'sl' ? 'Urbana Fotografija' : 'Urban Photography', 
          message: '' 
        });
        setConsent(false);
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('API Error:', result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="pt-12 md:pt-20 pb-24 md:pb-40 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-zinc-400 uppercase tracking-[0.5em] text-xs mb-4 block">{t.nav.contact}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              {t.contact.titleMain} <span className="font-serif italic font-normal text-zinc-400">{t.contact.titleItalic}</span>
            </h2>
            
            <div className="space-y-12 mt-16">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1">{t.contact.emailLabel}</h4>
                  <p className="text-zinc-200">info@zkphotolab.si</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1">{t.contact.socialLabel}</h4>
                  <a href="https://www.instagram.com/zkphotolab" target="_blank" className="text-zinc-200 hover:text-white transition-colors underline decoration-white/20 underline-offset-4">@zkphotolab</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-8 md:p-12 border border-white/5">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-sm">{t.contact.formTitle}</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400">{t.contact.nameLabel}</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  placeholder={t.contact.namePlaceholder}
                  className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400">{t.contact.emailInputLabel}</label>
                  <input 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="janez@example.com"
                    className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-400">{t.contact.typeLabel}</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100 appearance-none"
                  >
                    {t.services.items.map(s => <option key={s.id}>{s.title}</option>)}
                    <option>{lang === 'sl' ? 'Drugo' : 'Other'}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400">{t.contact.messageLabel}</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full bg-black border border-white/10 p-4 focus:border-white/40 focus:outline-none transition-colors text-zinc-100"
                ></textarea>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="gdpr-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-black border-white/20 rounded accent-white cursor-pointer"
                />
                <label htmlFor="gdpr-consent" className="text-[10px] leading-relaxed text-zinc-400 tracking-wide cursor-pointer">
                  {t.contact.consentText}
                  <button 
                    type="button"
                    onClick={() => onNavigate && onNavigate('privacy')}
                    className="underline decoration-white/20 underline-offset-2 hover:text-white transition-colors"
                  >
                    {t.contact.privacyLink}
                  </button>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={status === 'sending' || !consent}
                className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-600 text-white' 
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-400'
                }`}
              >
                {status === 'idle' && <>{t.contact.btnSend} <Send size={14} /></>}
                {status === 'sending' && t.contact.btnSending}
                {status === 'success' && <>{t.contact.btnSuccess} <Check size={14} /></>}
                {status === 'error' && <>{t.contact.btnError} <AlertCircle size={14} /></>}
              </button>

              <p className="text-[9px] leading-relaxed text-zinc-500 tracking-wider text-justify mt-6">
                {t.contact.infoNote}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
