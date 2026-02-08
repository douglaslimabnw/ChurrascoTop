import { useState } from 'react';
import { useChurrasco } from './hooks/useChurrasco';
import { useTheme } from './hooks/useTheme';
import { ChurrascoForm } from './components/ChurrascoForm';
import { ChurrascoVisual } from './components/ChurrascoVisual';
import { ResultsPanel } from './components/ResultsPanel';
import { AffiliateProducts } from './components/AffiliateProducts';
import { AdSlot } from './components/AdSlot';
import { ThemeToggle } from './components/ThemeToggle';

export function App() {
  const { config, updateConfig, updatePeopleBreakdown, result } = useChurrasco();
  const { dark } = useTheme();
  const [showResults, setShowResults] = useState(true);
  const [mobileTab, setMobileTab] = useState<'form' | 'visual'>('form');

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      dark
        ? 'bg-dark-950 text-dark-100'
        : 'bg-gradient-to-br from-charcoal-50 via-brand-50/20 to-charcoal-50 text-charcoal-900'
    }`}>
      {/* Header */}
      <header className={`relative overflow-hidden border-b backdrop-blur-md transition-colors duration-300 ${
        dark
          ? 'border-dark-700 bg-dark-900/80'
          : 'border-brand-100/50 bg-white/80'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-red-600 text-xl shadow-lg shadow-brand-500/20">
              🔥
            </div>
            <div>
              <h1 className={`text-lg font-extrabold tracking-tight sm:text-xl ${
                dark ? 'text-dark-100' : 'text-charcoal-900'
              }`}>
                Bora de Churras!
              </h1>
              <p className={`hidden text-xs sm:block ${
                dark ? 'text-dark-400' : 'text-charcoal-500'
              }`}>
                Calculadora inteligente de churrasco
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <AdSlot format="small" className={`border-t px-4 py-1.5 ${
          dark ? 'border-dark-700' : 'border-charcoal-100/50'
        }`} />
      </header>

      {/* Mobile tab switcher */}
      <div className={`sticky top-0 z-20 flex border-b backdrop-blur-md lg:hidden transition-colors duration-300 ${
        dark
          ? 'border-dark-700 bg-dark-900/90'
          : 'border-charcoal-200 bg-white/90'
      }`}>
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
            mobileTab === 'form'
              ? 'border-b-2 border-brand-600 text-brand-500'
              : dark ? 'text-dark-400' : 'text-charcoal-500'
          }`}
        >
          ⚙️ Configurar
        </button>
        <button
          onClick={() => setMobileTab('visual')}
          className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
            mobileTab === 'visual'
              ? 'border-b-2 border-brand-600 text-brand-500'
              : dark ? 'text-dark-400' : 'text-charcoal-500'
          }`}
        >
          🔥 Visualizar
        </button>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left: Form */}
          <div
            className={`w-full lg:w-[480px] lg:shrink-0 ${
              mobileTab !== 'form' ? 'hidden lg:block' : ''
            }`}
          >
            <div className={`rounded-2xl border p-5 shadow-sm transition-colors duration-300 sm:p-6 ${
              dark
                ? 'border-dark-700 bg-dark-900'
                : 'border-charcoal-100 bg-white'
            }`}>
              <ChurrascoForm
                config={config}
                updateConfig={updateConfig}
                updatePeopleBreakdown={updatePeopleBreakdown}
              />

              {/* Calculate button (mobile) */}
              <button
                onClick={() => {
                  setShowResults(true);
                  setMobileTab('visual');
                }}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-600 to-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all duration-200 hover:from-brand-700 hover:to-red-700 hover:shadow-xl active:scale-[0.98] lg:hidden"
              >
                🔥 Ver Resultado
              </button>
            </div>
          </div>

          {/* Right: Visual + Results */}
          <div
            className={`flex-1 space-y-6 ${
              mobileTab !== 'visual' ? 'hidden lg:block' : ''
            }`}
          >
            <div className="min-h-[380px]">
              <ChurrascoVisual config={config} result={result} />
            </div>

            <div className={`${!showResults && 'hidden lg:block'}`}>
              <ResultsPanel result={result} />
            </div>

            <AdSlot format="horizontal" className="mt-4" />
          </div>
        </div>

        {/* Affiliate Products - full width below main content */}
        <div className="mt-8">
          <AffiliateProducts />
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 border-t transition-colors duration-300 ${
        dark
          ? 'border-dark-700 bg-dark-900/50'
          : 'border-charcoal-100 bg-white/50'
      }`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className={`flex items-center gap-2 text-sm ${
              dark ? 'text-dark-400' : 'text-charcoal-500'
            }`}>
              <span className="text-lg">🔥</span>
              <span>
                <strong className={dark ? 'text-dark-200' : 'text-charcoal-700'}>Bora de Churras!</strong> — Feito com ❤️ para
                churrasqueiros
              </span>
            </div>
            <p className={`text-xs ${dark ? 'text-dark-500' : 'text-charcoal-400'}`}>
              As quantidades são estimativas e podem variar conforme o apetite dos convidados 😄
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
