import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle2, XCircle, Camera, Monitor, Expand } from 'lucide-react';
import accessCodes from '../data/access_codes.json';

export default function Scanner() {
  const [result, setResult] = useState<{ status: 'VALID' | 'INVALID'; code?: string } | null>(null);
  const [isKiosk, setIsKiosk] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!result) {
      const scanner = new Html5QrcodeScanner('reader', { 
        fps: 20, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }, false);

      scanner.render((decodedText) => {
        handleScan(decodedText);
      }, (error) => {
        // Ignore warnings
      });

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [result]);

  const handleScan = (decodedText: string) => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
    }
    // Check if the decoded text matches any of the 500 unique codes
    if (accessCodes.includes(decodedText)) {
      setResult({ status: 'VALID', code: decodedText });
    } else {
      setResult({ status: 'INVALID' });
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 transition-all duration-500 ${isKiosk ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
      {!result && (
        <div className="mb-6 flex gap-4 print:hidden">
          <button 
            onClick={() => setIsKiosk(!isKiosk)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              isKiosk ? 'bg-white text-zinc-900 shadow-xl' : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
            }`}
          >
            {isKiosk ? <Expand className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            {isKiosk ? 'Exit Kiosk Mode' : 'Enter Kiosk Mode'}
          </button>
        </div>
      )}

      <div className={`transition-all duration-700 ease-in-out ${isKiosk && !result ? 'w-full max-w-4xl' : 'max-w-md w-full'}`}>
        <div className={`relative bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 ${isKiosk ? 'border-zinc-800' : 'border-zinc-900'}`}>
          {!result ? (
            <div className="flex-1 flex flex-col items-center p-8 pt-16">
              <h2 className="text-2xl font-black mb-10 text-white tracking-tight">Access Control Scanner</h2>
              
              <div className={`relative rounded-3xl overflow-hidden border-2 border-white/10 bg-zinc-900 group transition-all duration-500 ${isKiosk ? 'w-[400px] h-[400px]' : 'w-64 h-64'}`}>
                <div id="reader" className="w-full h-full object-cover grayscale opacity-60"></div>
                
                {/* The Laser Scanner Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-scan z-20"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-red-600 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-red-600 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-red-600 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-red-600 rounded-br-2xl"></div>
              </div>

              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-black">
                  <Camera className="w-3 h-3" /> System Ready
                </div>
                <p className="text-white/40 text-sm font-medium max-w-[200px] mx-auto">
                  Align badge QR code within the frame to authenticate
                </p>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center p-12 min-h-[500px] transition-colors duration-500 ${result.status === 'VALID' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {result.status === 'VALID' ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-500 text-center">
                  <div className="bg-white rounded-[2.5rem] p-8 mb-10 shadow-2xl">
                    <img src="/logo.png" alt="APC Logo" className="w-32 h-32 object-contain" />
                  </div>
                  <CheckCircle2 className="w-24 h-24 mb-6 text-white" />
                  <h1 className="text-5xl font-black mb-3 text-white tracking-tighter">AUTHENTICATED</h1>
                  <p className="text-emerald-100 font-bold uppercase tracking-widest text-sm mb-10 opacity-80">Access Granted</p>
                  <div className="bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-md mb-12">
                    <span className="text-white font-mono text-xl font-bold">{result.code}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-in zoom-in duration-500 text-center">
                  <div className="w-48 h-48 bg-white/10 rounded-[2.5rem] mb-10 flex items-center justify-center backdrop-blur-md border border-white/10">
                    <XCircle className="w-32 h-32 text-white" />
                  </div>
                  <h1 className="text-5xl font-black mb-3 text-white tracking-tighter">DENIED</h1>
                  <p className="text-rose-100 font-bold uppercase tracking-widest text-sm mb-12 opacity-80">Invalid Credentials</p>
                </div>
              )}

              <button 
                onClick={() => setResult(null)} 
                className="w-full bg-white text-zinc-900 font-black py-6 px-12 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-all active:scale-95 text-xl tracking-tight"
              >
                Scan Next Badge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
