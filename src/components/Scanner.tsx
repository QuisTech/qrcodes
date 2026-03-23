import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle2, XCircle, Camera, Monitor, Expand, RefreshCw, AlertCircle } from 'lucide-react';
import accessCodes from '../data/access_codes.json';

export default function Scanner() {
  const [result, setResult] = useState<{ status: 'VALID' | 'INVALID'; code?: string } | null>(null);
  const [isKiosk, setIsKiosk] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScannerStarted, setIsScannerStarted] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const isStartingRef = useRef(false);

  const startScanner = async () => {
    if (isStartingRef.current || (html5QrCodeRef.current && html5QrCodeRef.current.isScanning)) {
      return;
    }

    try {
      isStartingRef.current = true;
      setCameraError(null);
      
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }

      // Check for HTTPS (except localhost)
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (window.location.protocol !== 'https:' && !isLocalhost) {
        throw new Error("Camera 🔒 is BLOCKED on non-secure sites. You MUST use HTTPS or localhost to scan.");
      }

      const config = { 
        fps: 20, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      // Try environment first, then fallback to user
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" }, 
          config, 
          (decodedText) => handleScan(decodedText),
          () => {}
        );
      } catch (e: any) {
        console.warn("Environment camera failed, trying fallback...", e);
        // Only retry if it's not a 'transition' error (which means we are already starting)
        if (!e.toString().includes("is already under transition")) {
          await html5QrCodeRef.current.start(
            { facingMode: "user" }, 
            config, 
            (decodedText) => handleScan(decodedText),
            () => {}
          );
        }
      }
      
      setIsScannerStarted(true);
      setCameraError(null); // Explicitly clear if success
    } catch (err: any) {
      console.error("CRITICAL Camera error:", err);
      // Ignore transition errors - they are just race conditions in dev
      if (!err.toString().includes("is already under transition")) {
        let errorMsg = err.message || "Failed to start camera.";
        if (errorMsg.includes("Permission denied")) {
          errorMsg = "Browser ❌ blocked the camera. Please click the camera icon in your address bar and 'Allow' it.";
        } else if (errorMsg.includes("NotFound")) {
          errorMsg = "No camera found on this device.";
        }
        setCameraError(errorMsg);
      }
      setIsScannerStarted(false);
    } finally {
      isStartingRef.current = false;
    }
  };

  useEffect(() => {
    if (!result) {
      startScanner();
    }

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [result]);

  const handleScan = async (decodedText: string) => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        setIsScannerStarted(false);
      } catch (e) {
        console.error("Stop error:", e);
      }
    }
    
    if (accessCodes.includes(decodedText)) {
      setResult({ status: 'VALID', code: decodedText });
    } else {
      setResult({ status: 'INVALID' });
    }
  };

  const resetScanner = () => {
    setResult(null);
    setCameraError(null);
  };

  if (result) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 transition-all duration-500 ${result.status === 'VALID' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
        <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center border-4 border-white animate-in zoom-in duration-500">
          <div className="flex justify-center mb-8">
            {result.status === 'VALID' ? (
              <div className="bg-emerald-100 p-6 rounded-full">
                <CheckCircle2 className="w-24 h-24 text-emerald-600" />
              </div>
            ) : (
              <div className="bg-rose-100 p-6 rounded-full">
                <XCircle className="w-24 h-24 text-rose-600" />
              </div>
            )}
          </div>
          
          <h2 className={`text-5xl font-black mb-4 ${result.status === 'VALID' ? 'text-emerald-900' : 'text-rose-900'}`}>
            {result.status === 'VALID' ? 'AUTHENTICATED' : 'ACCESS DENIED'}
          </h2>
          <p className="text-xl text-zinc-500 mb-10 font-medium">
            Code: <span className="font-mono bg-zinc-100 px-3 py-1 rounded-lg text-zinc-900">{result.code || 'NULL'}</span>
          </p>

          {result.status === 'VALID' && (
            <div className="bg-zinc-50 rounded-3xl p-8 mb-10 border border-zinc-100">
              <img src="/logo.png" alt="APC Logo" className="h-24 mx-auto mb-6 opacity-90" />
              <p className="font-black text-2xl text-zinc-900 uppercase">Security Committee</p>
              <p className="text-zinc-400 font-bold uppercase tracking-widest">APC Convention 2026</p>
            </div>
          )}

          <button
            onClick={resetScanner}
            className={`w-full py-6 rounded-2xl text-2xl font-black transition-all shadow-lg active:scale-95 ${
              result.status === 'VALID' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            Scan Next Badge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 transition-all duration-500 ${isKiosk ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
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

      <div className={`transition-all duration-700 ease-in-out ${isKiosk ? 'w-full max-w-4xl' : 'max-w-md w-full'}`}>
        <div className={`relative bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 ${isKiosk ? 'border-zinc-800' : 'border-zinc-900'}`}>
          <div className="p-6 flex justify-between items-center bg-black/40 backdrop-blur-md absolute top-0 w-full z-10">
            <span className="text-white/60 font-bold text-sm">SECURITY SCANNER</span>
            <div className="flex gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isScannerStarted ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>

          <div className="p-12 pt-24">
            <h1 className="text-white text-3xl font-black text-center mb-10 tracking-tight uppercase">Ready to Scan</h1>
            
            <div className={`relative mx-auto rounded-3xl overflow-hidden border-2 border-white/10 bg-zinc-900 shadow-inner group transition-all duration-500 ${isKiosk ? 'h-[500px]' : 'h-[300px]'}`}>
              <div id="reader" className="w-full h-full object-cover grayscale opacity-90 transition-opacity"></div>
              
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 p-8 text-center z-30">
                  <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
                  <p className="text-white font-bold mb-6">{cameraError}</p>
                  <button 
                    onClick={startScanner}
                    className="flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-xl font-black hover:bg-zinc-100 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" /> Retry Camera
                  </button>
                </div>
              )}

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-red-600 rounded-tl-2xl z-20"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-red-600 rounded-tr-2xl z-20"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-red-600 rounded-bl-2xl z-20"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-red-600 rounded-br-2xl z-20"></div>

              {/* Red Laser Scanning Effect */}
              {isScannerStarted && !cameraError && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)] animate-scan z-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-transparent to-red-600/10 pointer-events-none z-10"></div>
                </>
              )}
            </div>

            <div className="mt-10 text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 transition-colors ${
                isScannerStarted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                {isScannerStarted ? <Camera className="w-4 h-4" /> : <RefreshCw className="w-4 h-4 animate-spin" />}
                <span className="font-black text-[10px] uppercase tracking-widest">
                  {isScannerStarted ? 'Webcam Active' : 'Starting System...'}
                </span>
              </div>
              <p className="text-white/40 text-sm font-medium">Position the badge QR code clearly within the scanning frame</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
