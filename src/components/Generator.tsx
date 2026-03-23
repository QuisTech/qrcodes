import { QRCodeCanvas } from 'qrcode.react';

export default function Generator() {
  const code = "K45C-67Q2"; // Using one of the new alphanumeric codes

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-zinc-800 tracking-tight">Access Badge Generator</h2>
      
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 flex flex-col items-center print:shadow-none print:border-none">
        <div className="p-4 bg-zinc-50 rounded-2xl mb-8">
          <QRCodeCanvas value={code} size={256} level="H" />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-2xl font-black text-zinc-900 tracking-tighter uppercase">Security Committee</p>
          <p className="text-lg text-zinc-500 font-medium">APC Convention 2026</p>
          <div className="mt-6 inline-block bg-zinc-900 text-white px-4 py-2 rounded-lg font-mono text-sm">
            {code}
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.print()} 
        className="mt-10 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 print:hidden"
      >
        Print Secure Badge
      </button>
    </div>
  );
}
