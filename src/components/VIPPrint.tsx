import { QRCodeCanvas } from 'qrcode.react';
import { Crown } from 'lucide-react';
import vipCodes from '../data/vip_codes.json';

export default function VIPPrint() {
  return (
    <div className="p-12 bg-zinc-50 min-h-screen font-serif">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 print:hidden">
          <div>
            <h1 className="text-5xl font-bold text-zinc-900 tracking-tight mb-2" style={{ fontFamily: '"Prata", serif' }}>
              VIP Registration
            </h1>
            <p className="text-zinc-400 font-bold tracking-[0.3em] text-[10px] uppercase">{vipCodes.length} VIP BADGES GENERATED</p>
          </div>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-3 px-10 py-5 bg-zinc-900 hover:bg-black text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <Printer className="w-6 h-6" /> PRINT VIP BADGES
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 print:grid-cols-2 print:gap-14">
          {vipCodes.map((code) => (
            <div 
              key={code} 
              className="relative aspect-[1/1.4] w-full bg-white rounded-[3.5rem] p-1 overflow-hidden shadow-2xl print:shadow-none break-inside-avoid-page mb-10"
            >
              {/* Solid black frame */}
              <div className="absolute inset-0 p-[3px] rounded-[3.5rem] bg-zinc-900">
                <div className="w-full h-full bg-white rounded-[3.4rem]"></div>
              </div>

              <div className="relative h-full flex flex-col items-center p-8 pt-12">
                {/* QR Code Segment - AT TOP */}
                <div className="relative group mb-10">
                  <div className="absolute inset-0 bg-zinc-100 blur-3xl rounded-full scale-110"></div>
                  <div className="relative p-5 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm">
                    <QRCodeCanvas 
                      value={code} 
                      size={180} 
                      level="H"
                      fgColor="#000000"
                      bgColor="transparent"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-900 rounded-tl-xl"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-900 rounded-br-xl"></div>
                  </div>
                </div>

                {/* VIP Header */}
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-serif text-zinc-900 font-bold tracking-tighter mb-1" style={{ fontFamily: '"Prata", serif' }}>
                    VIP
                  </h2>
                  <div className="text-zinc-500 font-bold tracking-[0.3em] text-[10px] mb-3 uppercase italic">Access Granted</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] w-6 bg-zinc-200"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-900 rotate-45"></div>
                    <div className="h-[1px] w-6 bg-zinc-200"></div>
                  </div>
                </div>

                <div className="mt-auto text-center w-full">
                  <div className="mb-6 flex flex-col items-center">
                    <Crown className="w-6 h-6 text-zinc-300 mb-2" />
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.4em]">APC Convention 2026</p>
                  </div>
                  
                  <div className="relative px-8 py-3.5 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900"></div>
                    <span className="text-xs font-mono text-zinc-900 tracking-[0.3em] font-black uppercase">{code}</span>
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
            background: #fff !important;
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
