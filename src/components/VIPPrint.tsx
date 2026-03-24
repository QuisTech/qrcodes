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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 print:grid-cols-3 print:gap-4">
          {vipCodes.map((code) => (
            <div 
              key={code} 
              className="border-2 border-zinc-100 rounded-[2rem] p-6 flex flex-col items-center shadow-sm print:shadow-none print:border-zinc-200 break-inside-avoid mb-4 bg-white"
            >
              <div className="bg-zinc-50 p-3 rounded-xl mb-4">
                <QRCodeCanvas 
                  value={code} 
                  size={160} 
                  level="H" 
                  fgColor="#000000"
                  bgColor="transparent"
                />
              </div>

              <div className="text-center w-full">
                <div className="mb-4">
                  <h2 className="text-xl font-serif text-zinc-900 font-bold tracking-tighter leading-none" style={{ fontFamily: '"Prata", serif' }}>
                    VIP
                  </h2>
                  <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-[0.2em] mt-1">Access Granted</p>
                </div>

                <div className="mb-4">
                  <p className="text-[10px] font-black text-zinc-900 uppercase leading-none mb-1">OFFICIAL VIP GUEST</p>
                  <p className="text-[8px] text-zinc-400 font-bold uppercase">APC Convention 2026</p>
                </div>

                <div className="bg-zinc-100 px-3 py-1 rounded-md inline-block">
                  <span className="text-[10px] font-mono font-bold text-zinc-600">{code}</span>
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
          .break-inside-avoid {
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
