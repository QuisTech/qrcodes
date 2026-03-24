import { useState, useEffect } from 'react';
import Generator from './components/Generator';
import Scanner from './components/Scanner';
import PrintAll from './components/PrintAll';
import VIPPrint from './components/VIPPrint';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState<'generator' | 'scanner' | 'bulk' | 'vip-print'>('scanner');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const admin = params.get('admin') === 'true';
    setIsAdmin(admin);
    if (admin) {
      setView('generator'); // Admin starts at generator
    } else {
      setView('scanner'); // Non-admin starts at scanner
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <nav className="p-4 bg-white shadow-sm border-b border-zinc-100 flex justify-center gap-6 sticky top-0 z-50 print:hidden">
        {isAdmin ? (
          <>
            <button 
              onClick={() => setView('scanner')} 
              className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'scanner' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              Scanner
            </button>
            <button 
              onClick={() => setView('generator')} 
              className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'generator' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              Generator
            </button>
            <button 
              onClick={() => setView('bulk')} 
              className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'bulk' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              Bulk Print (500)
            </button>
            <button 
              onClick={() => setView('vip-print')} 
              className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'vip-print' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-600 hover:bg-amber-50'}`}
            >
              VIP Print (300)
            </button>
          </>
        ) : (
          <button 
            onClick={() => setView('scanner')} 
            className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'scanner' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
          >
            Scanner
          </button>
        )}
      </nav>
      {view === 'generator' ? <Generator /> : view === 'scanner' ? <Scanner /> : view === 'bulk' ? <PrintAll /> : <VIPPrint />}
    </div>
  );
}
