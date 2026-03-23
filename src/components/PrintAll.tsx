import { QRCodeCanvas } from 'qrcode.react';
import accessCodes from '../data/access_codes.json';

export default function PrintAll() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Bulk Badge Export</h1>
            <p className="text-zinc-500 mt-1">Found {accessCodes.length} unique access codes</p>
          </div>
          <button 
            onClick={() => window.print()} 
            className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-colors shadow-lg"
          >
            Print All Badges
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 print:grid-cols-3 print:gap-4">
          {accessCodes.map((code) => (
            <div 
              key={code} 
              className="border-2 border-zinc-100 rounded-[2rem] p-6 flex flex-col items-center shadow-sm print:shadow-none print:border-zinc-200 break-inside-avoid mb-4"
            >
              <div className="bg-zinc-50 p-3 rounded-xl mb-4">
                <QRCodeCanvas value={code} size={160} level="M" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-zinc-900 uppercase leading-none mb-1">Security Committee</p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mb-3">APC Convention 2026</p>
                <div className="bg-zinc-100 px-3 py-1 rounded-md">
                  <span className="text-[10px] font-mono font-bold text-zinc-600">{code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            background: white !important;
          }
          .min-h-screen {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
