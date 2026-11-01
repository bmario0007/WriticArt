import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { atelierAudio } from '../../utils/soundEffects';
import logoDark from '../../assets/brand/logo-dark.jpg';

interface AdminPinLockProps {
  onUnlock: () => void;
  correctPin: string;
}

export const AdminPinLock: React.FC<AdminPinLockProps> = ({ onUnlock, correctPin }) => {
  const { navigateTo } = useNavigation();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === correctPin.trim()) {
      atelierAudio.playGoldChime();
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPin('');
      atelierAudio.playPaperSlide();
    }
  };

  const handleQuickKey = (num: string) => {
    if (pin.length < 8) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === correctPin) {
        atelierAudio.playGoldChime();
        setError(false);
        onUnlock();
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#FAF8F5] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E68314]/20 via-[#FAF8F5]/0 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar with back to site */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between relative z-10">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center space-x-2 text-xs font-['Cinzel'] uppercase font-bold text-[#A89F94] hover:text-[#E68314] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public</span>
        </button>

        <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest text-[#E68314] font-bold px-3 py-1 rounded-full bg-[#E68314]/10 border border-[#E68314]/30">
          Sécurisé SSL
        </span>
      </div>

      {/* Central Lock Card */}
      <div className="max-w-sm mx-auto w-full my-auto space-y-8 relative z-10 text-center">
        
        {/* Brand Logo & Lock icon */}
        <div className="space-y-4">
          <img
            src={logoDark}
            alt="WriticArt Logo"
            className="h-14 w-auto mx-auto object-contain rounded-xl shadow-2xl"
          />

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#24211D] to-[#181716] border border-[#E68314]/40 flex items-center justify-center mx-auto text-[#E68314] shadow-xl">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-light tracking-tight text-white">
              Espace Atelier & ERP
            </h1>
            <p className="text-xs text-[#8C8277] max-w-xs mx-auto font-light leading-relaxed">
              Veuillez saisir votre code secret pour accéder au tableau de bord, au gestionnaire WordPress et au fichier clients.
            </p>
          </div>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Code PIN d'atelier"
              className={`w-full py-3.5 px-4 rounded-2xl bg-[#1C1A18] border text-center text-2xl tracking-[0.4em] font-mono font-bold focus:outline-none transition-all ${
                error
                  ? 'border-red-500 text-red-400 ring-2 ring-red-500/20'
                  : 'border-[#38332E] text-white focus:border-[#E68314] focus:ring-2 focus:ring-[#E68314]/20'
              }`}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-1.5 text-xs text-red-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Code PIN incorrect. Veuillez réessayer.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E68314] to-[#C46A0B] text-white text-xs uppercase tracking-widest font-['Cinzel'] font-bold hover:brightness-110 transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Déverrouiller l'Atelier</span>
          </button>
        </form>

        {/* Quick Numeric Keypad for convenience on mobile & touch */}
        <div className="grid grid-cols-3 gap-2 pt-2 max-w-[280px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => handleQuickKey(num)}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-lg font-mono font-bold text-white transition-colors border border-white/5"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-['Cinzel'] uppercase font-bold text-[#A89F94] transition-colors border border-white/5"
          >
            Effacer
          </button>
          <button
            type="button"
            onClick={() => handleQuickKey('0')}
            className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-lg font-mono font-bold text-white transition-colors border border-white/5"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-3 rounded-xl bg-[#E68314]/20 hover:bg-[#E68314]/30 text-xs font-['Cinzel'] uppercase font-bold text-[#E68314] transition-colors border border-[#E68314]/30"
          >
            Valider
          </button>
        </div>

        {/* Helpful hint for owner */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A89F94]">
          <p>
            💡 <strong className="text-white">Code d'accès initial :</strong> <code className="bg-black/50 px-1.5 py-0.5 rounded text-[#E68314] font-mono">1234</code>
            <br />
            <span className="text-[10px] text-[#7A7167]">Vous pourrez le modifier dans l'onglet « Réglages » de l'ERP.</span>
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto w-full text-center text-[10px] text-[#5F5850] relative z-10">
        <p className="flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E68314]" />
          <span>WriticArt Dakar • Haute Calligraphie & Protection des Données</span>
        </p>
      </div>

    </div>
  );
};
