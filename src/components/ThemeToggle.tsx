import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    toggle();
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
        dark
          ? 'border-dark-600 bg-dark-800 hover:border-dark-500 hover:bg-dark-700'
          : 'border-charcoal-200 bg-white hover:border-charcoal-300 hover:bg-charcoal-50'
      }`}
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={dark ? 'Modo claro' : 'Modo escuro'}
    >
      <div className={animating ? 'animate-theme-toggle' : ''}>
        {dark ? (
          <svg
            className="h-[18px] w-[18px] text-amber-400 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            className="h-[18px] w-[18px] text-charcoal-600 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </div>
    </button>
  );
}
