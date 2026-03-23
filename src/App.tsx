import { useState } from 'react';
import Generator from './components/Generator';
import Scanner from './components/Scanner';
import PrintAll from './components/PrintAll';

export default function App() {
  const [view, setView] = useState<'generator' | 'scanner' | 'bulk'>('generator');
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <nav className="p-4 bg-white shadow-sm border-b border-zinc-100 flex justify-center gap-6 sticky top-0 z-50 print:hidden">
        <button 
          onClick={() => setView('generator')} 
          className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'generator' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
        >
          Generator
        </button>
        <button 
          onClick={() => setView('scanner')} 
          className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'scanner' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
        >
          Scanner
        </button>
        <button 
          onClick={() => setView('bulk')} 
          className={`px-4 py-2 rounded-xl transition-all font-bold ${view === 'bulk' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-100'}`}
        >
          Bulk Print (500)
        </button>
      </nav>
      {view === 'generator' ? <Generator /> : view === 'scanner' ? <Scanner /> : <PrintAll />}
    </div>
  );
}
