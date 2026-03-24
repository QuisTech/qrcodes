import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { User, Crown, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import accessCodes from '../data/access_codes.json';
import vipCodes from '../data/vip_codes.json';

export default function Generator() {
  const [category, setCategory] = useState<'standard' | 'vip'>('standard');
  const [codeIndex, setCodeIndex] = useState(0);

  const codes = category === 'vip' ? vipCodes : accessCodes;
  const currentCode = codes[codeIndex];
  const isVIP = category === 'vip';

  return (
    <div className="p-8 flex flex-col items-center bg-zinc-50 min-h-screen">
      {/* Category Toggle */}
      <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-zinc-100 mb-12 print:hidden backdrop-blur-md">
        <button 
          onClick={() => { setCategory('standard'); setCodeIndex(0); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-[1.5rem] font-black transition-all ${!isVIP ? 'bg-zinc-900 text-white shadow-xl scale-105' : 'text-zinc-400 hover:bg-zinc-50'}`}
        >
          <User className="w-5 h-5" /> Standard
        </button>
        <button 
          onClick={() => { setCategory('vip'); setCodeIndex(0); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-[1.5rem] font-black transition-all ${isVIP ? 'bg-amber-600 text-white shadow-xl scale-105' : 'text-zinc-400 hover:bg-zinc-50'}`}
        >
          <Crown className="w-5 h-5 transition-transform group-hover:rotate-12" /> VIP Premium
        </button>
      </div>
      
      <div className="flex flex-col items-center w-full max-w-4xl relative">
        {/* Navigation Arrows (Large Screens) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 print:hidden hidden lg:block">
          <button 
            onClick={() => setCodeIndex(prev => Math.max(0, prev - 1))}
            disabled={codeIndex === 0}
            className="p-4 bg-white rounded-full shadow-lg text-zinc-400 hover:text-zinc-900 disabled:opacity-20 transition-all border border-zinc-100"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 print:hidden hidden lg:block">
          <button 
            onClick={() => setCodeIndex(prev => (prev + 1) % codes.length)}
            className="p-4 bg-white rounded-full shadow-lg text-zinc-400 hover:text-zinc-900 transition-all border border-zinc-100"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* The Badge Card */}
        <div 
          className={`w-full max-w-md rounded-[3.5rem] p-1.5 shadow-2xl transition-all duration-700 ${isVIP ? 'hover:shadow-zinc-200/50' : 'hover:shadow-zinc-200/50'}`}
          style={{
            background: isVIP ? '#f4f4f5' : '#f4f4f5'
          }}
        >
          <div className={`rounded-[3.4rem] h-full w-full p-10 flex flex-col items-center overflow-hidden relative ${isVIP ? 'bg-white' : 'bg-white'}`}>
            {/* QR Code Segment - NOW AT TOP */}
            <div className={`p-6 rounded-[2.5rem] mb-8 relative transition-all duration-1000 overflow-hidden ${isVIP ? 'bg-zinc-50 shadow-inner' : 'bg-zinc-50 shadow-inner'}`}>
              <QRCodeCanvas 
                value={currentCode} 
                size={220} 
                level="H" 
                fgColor={isVIP ? '#000000' : '#000000'}
                bgColor="transparent"
              />
            </div>

            {/* Header Content - NOW BELOW QR */}
            <div className="text-center mb-10 w-full animate-in fade-in slide-in-from-top duration-700">
              <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 ${isVIP ? 'text-zinc-400' : 'text-zinc-400'}`}>
                {isVIP ? 'OFFICIAL VIP GUEST' : 'SECURITY COMMITTEE'}
              </h2>
              
              {isVIP ? (
                <div className="relative">
                  <h1 className="text-5xl font-serif text-zinc-900 font-bold tracking-tight mb-1" style={{ fontFamily: '"Prata", serif' }}>
                    VIP
                  </h1>
                  <div className="text-zinc-500 font-bold tracking-[0.2em] text-[11px] mb-4 uppercase italic">Access Granted</div>
                  <div className="flex items-center justify-center gap-2 text-zinc-200">
                    <div className="h-[1px] w-8 bg-current"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-900 rotate-45"></div>
                    <div className="h-[1px] w-8 bg-current"></div>
                  </div>
                </div>
              ) : (
                <img src="/logo.png" alt="Logo" className="h-20 mx-auto object-contain filter drop-shadow-sm" />
              )}
            </div>

            {/* Bottom Footer Section */}
            <div className="text-center w-full mt-auto">
              <p className={`text-[10px] font-black uppercase tracking-widest mb-6 ${isVIP ? 'text-zinc-300' : 'text-zinc-300'}`}>
                APC Convention 2026
              </p>
              
              <div className={`relative px-8 py-4 rounded-2xl border transition-all ${isVIP ? 'bg-zinc-50 text-zinc-900 border-zinc-100 shadow-sm' : 'bg-zinc-900 text-white border-zinc-800 shadow-md'}`}>
                {isVIP && <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900"></div>}
                <span className="font-mono text-xl font-bold tracking-[0.2em]">{currentCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls & Print Button */}
        <div className="mt-12 flex flex-col items-center gap-6 w-full print:hidden">
          <div className="flex items-center gap-4 text-zinc-400 font-black text-sm uppercase tracking-widest">
            <span>Badge {codeIndex + 1} of {codes.length}</span>
          </div>

          <div className="flex gap-4 w-full max-w-md">
            <button 
              onClick={() => window.print()} 
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 text-white ${isVIP ? 'bg-zinc-900 hover:bg-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}
            >
              <Printer className="w-6 h-6" /> Export Badge
            </button>
          </div>
          
          <div className="flex gap-4 w-full max-w-md lg:hidden">
            <button 
              onClick={() => setCodeIndex(prev => Math.max(0, prev - 1))}
              disabled={codeIndex === 0}
              className="flex-1 bg-white border border-zinc-200 p-5 rounded-2xl flex justify-center disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCodeIndex(prev => (prev + 1) % codes.length)}
              className="flex-1 bg-white border border-zinc-200 p-5 rounded-2xl flex justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
