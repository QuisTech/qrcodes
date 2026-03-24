import { QRCodeCanvas } from 'qrcode.react';
import { Crown } from 'lucide-react';
import vipCodes from '../data/vip_codes.json';

export default function VIPPrint() {
  return (
    <div className="p-12 bg-[#050505] min-h-screen font-serif">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 print:hidden">
          <div>
            <h1 className="text-5xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: '"Prata", serif' }}>
              VIP <span className="text-amber-500">Excellence</span>
            </h1>
            <p className="text-zinc-500 font-medium tracking-[0.3em] text-xs uppercase">Obsidian & Gold Collection • {vipCodes.length} Registered</p>
          </div>
          <button 
            onClick={() => window.print()} 
            className="group relative px-12 py-5 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(217,119,6,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Printer className="w-6 h-6" /> EXPORT VIP REGISTRY
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 print:grid-cols-2 print:gap-14">
          {vipCodes.map((code) => (
            <div 
              key={code} 
              className="relative aspect-[1/1.4] w-full bg-[#0a0a0a] rounded-[3.5rem] p-1 overflow-hidden shadow-2xl print:shadow-none break-inside-avoid-page mb-10"
            >
              {/* Metallic gold frame */}
              <div className="absolute inset-0 p-[3px] rounded-[3.5rem]" 
                   style={{ background: 'linear-gradient(135deg, #846210 0%, #D4AF37 50%, #846210 100%)' }}>
                <div className="w-full h-full bg-[#0a0a0a] rounded-[3.4rem]"></div>
              </div>

              <div className="relative h-full flex flex-col items-center p-8 pt-12">
                {/* QR Code Segment - NOW AT TOP */}
                <div className="relative group mb-10">
                  <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-110"></div>
                  <div className="relative p-5 bg-[#0f0f0f] rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <QRCodeCanvas 
                      value={code} 
                      size={180} 
                      level="H"
                      fgColor="#f59e0b"
                      bgColor="transparent"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-600 rounded-tl-xl"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-600 rounded-br-xl"></div>
                  </div>
                </div>

                {/* VIP Header - NOW BELOW QR */}
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-serif text-white font-bold tracking-tighter mb-1" style={{ fontFamily: '"Prata", serif' }}>
                    VIP
                  </h2>
                  <div className="text-amber-500 font-bold tracking-[0.3em] text-[10px] mb-3 uppercase">Access Granted</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] w-6 bg-amber-900"></div>
                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45"></div>
                    <div className="h-[1px] w-6 bg-amber-900"></div>
                  </div>
                </div>

                <div className="mt-auto text-center w-full">
                  <div className="mb-6 flex flex-col items-center">
                    <Crown className="w-6 h-6 text-amber-500/40 mb-2" />
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em]">APC Convention 2026</p>
                  </div>
                  
                  <div className="relative px-8 py-3.5 bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-600"></div>
                    <span className="text-xs font-mono text-white tracking-[0.3em] font-black uppercase">{code}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Prata';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/prata/v17/neIIzD-0H4snzSRCC6E.woff2) format('woff2');
        }
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            background: #050505 !important;
            -webkit-print-color-adjust: exact;
          }
          .break-inside-avoid-page {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}

import { Printer } from 'lucide-react';
