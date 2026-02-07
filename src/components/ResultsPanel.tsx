import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { ChurrascoResult } from '../hooks/useChurrasco';

interface ResultsPanelProps {
  result: ChurrascoResult;
}

function ResultSection({
  title,
  emoji,
  items,
  bgColor,
  textColor,
  borderColor,
}: {
  title: string;
  emoji: string;
  items: { name: string; emoji: string; quantity: string }[];
  bgColor: string;
  textColor: string;
  borderColor: string;
}) {
  const { dark } = useTheme();

  if (items.length === 0) return null;

  return (
    <div className={`rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${borderColor} ${
      dark ? 'bg-dark-900' : 'bg-white'
    }`}>
      <h4 className={`mb-3 flex items-center gap-2 text-sm font-bold ${
        dark ? 'text-dark-200' : 'text-charcoal-700'
      }`}>
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${bgColor}`}>
          {emoji}
        </span>
        {title}
      </h4>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`animate-fade-in-up flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
              dark ? 'hover:bg-dark-800' : 'hover:bg-charcoal-50'
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className={`flex items-center gap-2 text-sm ${
              dark ? 'text-dark-300' : 'text-charcoal-600'
            }`}>
              <span className="text-base">{item.emoji}</span>
              {item.name}
            </span>
            <span className={`text-sm font-bold tabular-nums ${textColor}`}>{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const { dark } = useTheme();
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    let text = '🔥 Lista de Churrasco - Churrascômetro\n\n';

    text += '🥩 CARNES:\n';
    result.meats.forEach(m => { text += `  ${m.emoji} ${m.name}: ${m.quantity}\n`; });

    text += '\n🍻 BEBIDAS:\n';
    result.drinks.forEach(d => { text += `  ${d.emoji} ${d.name}: ${d.quantity}\n`; });

    if (result.sides.length > 0) {
      text += '\n🥗 ACOMPANHAMENTOS:\n';
      result.sides.forEach(s => { text += `  ${s.emoji} ${s.name}: ${s.quantity}\n`; });
    }

    text += '\n🧊 EXTRAS:\n';
    result.extras.forEach(e => { text += `  ${e.emoji} ${e.name}: ${e.quantity}\n`; });

    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generateShareText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h3 className={`text-lg font-bold ${dark ? 'text-dark-100' : 'text-charcoal-800'}`}>
            Lista de Compras
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            copied
              ? 'bg-emerald-100 text-emerald-700'
              : dark
                ? 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
          }`}
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copiar lista
            </>
          )}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultSection
          title="Carnes"
          emoji="🥩"
          items={result.meats}
          bgColor={dark ? 'bg-red-500/15' : 'bg-red-50'}
          textColor={dark ? 'text-red-400' : 'text-red-700'}
          borderColor={dark ? 'border-red-500/20' : 'border-red-100'}
        />
        <ResultSection
          title="Bebidas"
          emoji="🍻"
          items={result.drinks}
          bgColor={dark ? 'bg-amber-500/15' : 'bg-amber-50'}
          textColor={dark ? 'text-amber-400' : 'text-amber-700'}
          borderColor={dark ? 'border-amber-500/20' : 'border-amber-100'}
        />
        <ResultSection
          title="Acompanhamentos"
          emoji="🥗"
          items={result.sides}
          bgColor={dark ? 'bg-green-500/15' : 'bg-green-50'}
          textColor={dark ? 'text-green-400' : 'text-green-700'}
          borderColor={dark ? 'border-green-500/20' : 'border-green-100'}
        />
        <ResultSection
          title="Extras"
          emoji="🧊"
          items={result.extras}
          bgColor={dark ? 'bg-blue-500/15' : 'bg-blue-50'}
          textColor={dark ? 'text-blue-400' : 'text-blue-700'}
          borderColor={dark ? 'border-blue-500/20' : 'border-blue-100'}
        />
      </div>
    </div>
  );
}
