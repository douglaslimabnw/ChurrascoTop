import { useTheme } from '../hooks/useTheme';
import type { ChurrascoConfig } from '../hooks/useChurrasco';

interface ChurrascoFormProps {
  config: ChurrascoConfig;
  updateConfig: (updates: Partial<ChurrascoConfig>) => void;
  updatePeopleBreakdown: (field: 'men' | 'women' | 'kids', value: number) => void;
}

function Slider({
  label,
  emoji,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = '',
  color = 'brand',
}: {
  label: string;
  emoji: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  color?: string;
}) {
  const { dark } = useTheme();
  const colorClasses: Record<string, string> = {
    brand: 'accent-brand-600',
    blue: 'accent-blue-600',
    pink: 'accent-pink-600',
    green: 'accent-emerald-600',
    amber: 'accent-amber-600',
  };

  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <label className={`flex items-center gap-1.5 text-sm font-medium ${
          dark ? 'text-dark-200' : 'text-charcoal-800'
        }`}>
          <span className="text-base">{emoji}</span>
          {label}
        </label>
        <span className={`rounded-md px-2 py-0.5 text-sm font-bold tabular-nums ${
          dark
            ? 'bg-brand-500/15 text-brand-400'
            : 'bg-brand-50 text-brand-700'
        }`}>
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-2 w-full cursor-pointer appearance-none rounded-full transition-all focus:outline-none ${
          dark ? 'bg-dark-700' : 'bg-charcoal-100'
        } ${colorClasses[color] || colorClasses.brand}`}
      />
      <div className={`mt-0.5 flex justify-between text-[10px] ${
        dark ? 'text-dark-500' : 'text-charcoal-400'
      }`}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ToggleChip({
  label,
  emoji,
  active,
  onChange,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  const { dark } = useTheme();

  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200
        ${active
          ? dark
            ? 'border-brand-500/40 bg-brand-500/15 text-brand-300 shadow-sm shadow-brand-500/10'
            : 'border-brand-300 bg-brand-50 text-brand-800 shadow-sm shadow-brand-100'
          : dark
            ? 'border-dark-600 bg-dark-800 text-dark-400 hover:border-dark-500 hover:bg-dark-700'
            : 'border-charcoal-200 bg-white text-charcoal-500 hover:border-charcoal-300 hover:bg-charcoal-50'
        }
      `}
    >
      <span className="text-sm">{emoji}</span>
      {label}
      {active && (
        <svg className={`h-3 w-3 ${dark ? 'text-brand-400' : 'text-brand-600'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon: string }) {
  const { dark } = useTheme();
  return (
    <div className={`flex items-center gap-2 border-b pb-2 ${
      dark ? 'border-dark-700' : 'border-charcoal-100'
    }`}>
      <span className="text-lg">{icon}</span>
      <h3 className={`text-sm font-bold uppercase tracking-wider ${
        dark ? 'text-dark-300' : 'text-charcoal-600'
      }`}>{children}</h3>
    </div>
  );
}

export function ChurrascoForm({ config, updateConfig, updatePeopleBreakdown }: ChurrascoFormProps) {
  const { dark } = useTheme();

  return (
    <div className="space-y-6">
      {/* People section */}
      <div className="space-y-4 animate-fade-in-up">
        <SectionTitle icon="👥">Pessoas</SectionTitle>

        <Slider
          label="Total de pessoas"
          emoji="🎉"
          value={config.totalPeople}
          min={1}
          max={50}
          onChange={(v) => updateConfig({ totalPeople: v })}
          color="brand"
        />

        <div className={`rounded-xl p-4 space-y-3 ${
          dark ? 'bg-dark-800/50' : 'bg-charcoal-50/50'
        }`}>
          <p className={`text-xs font-medium ${dark ? 'text-dark-400' : 'text-charcoal-500'}`}>
            Ajuste fino:
          </p>
          <Slider
            label="Homens"
            emoji="👨"
            value={config.men}
            min={0}
            max={40}
            onChange={(v) => updatePeopleBreakdown('men', v)}
            color="amber"
          />
          <Slider
            label="Mulheres"
            emoji="👩"
            value={config.women}
            min={0}
            max={40}
            onChange={(v) => updatePeopleBreakdown('women', v)}
            color="pink"
          />
          <Slider
            label="Crianças"
            emoji="👶"
            value={config.kids}
            min={0}
            max={20}
            onChange={(v) => updatePeopleBreakdown('kids', v)}
            color="green"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <SectionTitle icon="⏰">Duração</SectionTitle>
        <Slider
          label="Horas de festa"
          emoji="🕐"
          value={config.duration}
          min={2}
          max={8}
          onChange={(v) => updateConfig({ duration: v })}
          suffix="h"
          color="blue"
        />
      </div>

      {/* Drinks */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <SectionTitle icon="🍻">Bebidas</SectionTitle>
        <Slider
          label="Bebem cerveja"
          emoji="🍺"
          value={config.beerDrinkers}
          min={0}
          max={config.men + config.women}
          onChange={(v) => updateConfig({ beerDrinkers: v, softDrinkOnly: config.totalPeople - v })}
          color="amber"
        />
      </div>

      {/* Meats */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <SectionTitle icon="🥩">Carnes</SectionTitle>
        <div className="flex flex-wrap gap-2">
          <ToggleChip label="Carne Bovina" emoji="🥩" active={true} onChange={() => {}} />
          <ToggleChip
            label="Frango"
            emoji="🍗"
            active={config.includeChicken}
            onChange={(v) => updateConfig({ includeChicken: v })}
          />
          <ToggleChip
            label="Linguiça"
            emoji="🌭"
            active={config.includeSausage}
            onChange={(v) => updateConfig({ includeSausage: v })}
          />
          <ToggleChip
            label="Porco"
            emoji="🐷"
            active={config.includePork}
            onChange={(v) => updateConfig({ includePork: v })}
          />
        </div>
      </div>

      {/* Sides & Extras */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <SectionTitle icon="🥗">Acompanhamentos</SectionTitle>
        <div className="flex flex-wrap gap-2">
          <ToggleChip
            label="Queijo Coalho"
            emoji="🧀"
            active={config.includeCheese}
            onChange={(v) => updateConfig({ includeCheese: v })}
          />
          <ToggleChip
            label="Pão de Alho"
            emoji="🍞"
            active={config.includeBread}
            onChange={(v) => updateConfig({ includeBread: v })}
          />
          <ToggleChip
            label="Arroz"
            emoji="🍚"
            active={config.includeRice}
            onChange={(v) => updateConfig({ includeRice: v })}
          />
          <ToggleChip
            label="Farofa"
            emoji="🥄"
            active={config.includeFarofa}
            onChange={(v) => updateConfig({ includeFarofa: v })}
          />
          <ToggleChip
            label="Vinagrete"
            emoji="🥗"
            active={config.includeVinaigrette}
            onChange={(v) => updateConfig({ includeVinaigrette: v })}
          />
          <ToggleChip
            label="Alho"
            emoji="🧄"
            active={config.includeGarlic}
            onChange={(v) => updateConfig({ includeGarlic: v })}
          />
        </div>
      </div>
    </div>
  );
}
