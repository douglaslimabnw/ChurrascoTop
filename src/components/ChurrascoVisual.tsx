import { useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { ChurrascoConfig, ChurrascoResult } from '../hooks/useChurrasco';

interface ChurrascoVisualProps {
  config: ChurrascoConfig;
  result: ChurrascoResult;
}

function PersonIcon({ type, index }: { type: 'man' | 'woman' | 'kid'; index: number }) {
  const { dark } = useTheme();

  const colors = {
    man: {
      body: dark ? 'fill-brand-400' : 'fill-brand-500',
      legs: dark ? 'fill-brand-500' : 'fill-brand-400',
    },
    woman: {
      body: dark ? 'fill-pink-400' : 'fill-pink-400',
      legs: dark ? 'fill-pink-500' : 'fill-pink-300',
    },
    kid: {
      body: dark ? 'fill-emerald-400' : 'fill-emerald-400',
      legs: dark ? 'fill-emerald-500' : 'fill-emerald-300',
    },
  };
  const c = colors[type];

  return (
    <div
      className="flex items-end"
      style={{
        opacity: 0,
        animation: `fadeInScale 0.3s ease-out ${index * 35}ms forwards`,
      }}
    >
      {type === 'kid' ? (
        <svg className="h-7 w-5 sm:h-8 sm:w-6" viewBox="0 0 24 36" fill="none">
          <circle cx="12" cy="6" r="5" className={c.body} />
          <rect x="5" y="13" width="14" height="12" rx="4" className={c.body} />
          <rect x="6" y="25" width="4.5" height="10" rx="2.25" className={c.legs} />
          <rect x="13.5" y="25" width="4.5" height="10" rx="2.25" className={c.legs} />
        </svg>
      ) : type === 'woman' ? (
        <svg className="h-9 w-6 sm:h-10 sm:w-7" viewBox="0 0 28 44" fill="none">
          <circle cx="14" cy="7" r="6" className={c.body} />
          <path d="M6 16C6 13.79 7.79 12 10 12h8c2.21 0 4 1.79 4 4v6l2 13H4l2-13V16z" className={c.body} />
          <rect x="7" y="35" width="5" height="8" rx="2.5" className={c.legs} />
          <rect x="16" y="35" width="5" height="8" rx="2.5" className={c.legs} />
        </svg>
      ) : (
        <svg className="h-9 w-6 sm:h-10 sm:w-7" viewBox="0 0 28 44" fill="none">
          <circle cx="14" cy="7" r="6" className={c.body} />
          <rect x="6" y="15" width="16" height="16" rx="4" className={c.body} />
          <rect x="7" y="31" width="5.5" height="12" rx="2.75" className={c.legs} />
          <rect x="15.5" y="31" width="5.5" height="12" rx="2.75" className={c.legs} />
        </svg>
      )}
    </div>
  );
}

function MeterBar({ label, value, max, color, icon }: {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}) {
  const { dark } = useTheme();
  const pct = Math.min((value / max) * 100, 100);

  const colorMap: Record<string, { bg: string; fill: string; text: string }> = {
    red: {
      bg: dark ? 'bg-red-500/10' : 'bg-red-100',
      fill: dark ? 'bg-red-500' : 'bg-red-400',
      text: dark ? 'text-red-400' : 'text-red-700',
    },
    amber: {
      bg: dark ? 'bg-amber-500/10' : 'bg-amber-100',
      fill: dark ? 'bg-amber-500' : 'bg-amber-400',
      text: dark ? 'text-amber-400' : 'text-amber-700',
    },
    blue: {
      bg: dark ? 'bg-blue-500/10' : 'bg-blue-100',
      fill: dark ? 'bg-blue-500' : 'bg-blue-400',
      text: dark ? 'text-blue-400' : 'text-blue-700',
    },
  };
  const c = colorMap[color] || colorMap.red;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className={`flex items-center gap-1.5 text-xs font-medium ${
          dark ? 'text-dark-300' : 'text-charcoal-600'
        }`}>
          <span>{icon}</span> {label}
        </span>
        <span className={`text-xs font-bold tabular-nums ${c.text}`}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${c.bg}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${c.fill}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ChurrascoVisual({ config, result }: ChurrascoVisualProps) {
  const { dark } = useTheme();
  const { men, women, kids } = config;
  const totalPeople = men + women + kids;

  const people = useMemo(() => {
    const arr: { type: 'man' | 'woman' | 'kid'; key: string }[] = [];
    for (let i = 0; i < Math.min(men, 25); i++) arr.push({ type: 'man', key: `m${i}` });
    for (let i = 0; i < Math.min(women, 25); i++) arr.push({ type: 'woman', key: `w${i}` });
    for (let i = 0; i < Math.min(kids, 15); i++) arr.push({ type: 'kid', key: `k${i}` });
    return arr;
  }, [men, women, kids]);

  const totalMeatKg = result.meats.reduce((s, m) => s + m.kg, 0);
  const totalBeerL = result.drinks.find(d => d.name === 'Cerveja')?.liters || 0;
  const totalSodaL = result.drinks.find(d => d.name === 'Refrigerante')?.liters || 0;
  const totalWaterL = result.drinks.find(d => d.name === 'Água')?.liters || 0;

  const displayCount = people.length;

  const intensity = totalPeople <= 5
    ? { label: 'Churrasquinho', emoji: '🔥' }
    : totalPeople <= 15
    ? { label: 'Churrasco', emoji: '🔥🔥' }
    : totalPeople <= 30
    ? { label: 'Churrasção', emoji: '🔥🔥🔥' }
    : { label: 'Festival de Carne', emoji: '🔥🔥🔥🔥' };

  return (
    <div className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-colors duration-300 ${
      dark
        ? 'border-dark-700 bg-dark-900'
        : 'border-charcoal-100 bg-white'
    }`}>
      {/* Subtle dot pattern background */}
      <div
        className={`pointer-events-none absolute inset-0 ${dark ? 'opacity-[0.04]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header */}
      <div className={`relative border-b px-5 py-4 ${
        dark ? 'border-dark-700' : 'border-charcoal-100'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-base font-bold ${dark ? 'text-dark-100' : 'text-charcoal-800'}`}>
              Seu Churrasco
            </h2>
            <p className={`mt-0.5 text-xs ${dark ? 'text-dark-400' : 'text-charcoal-400'}`}>
              {config.duration}h de festa · {totalPeople} {totalPeople === 1 ? 'pessoa' : 'pessoas'}
            </p>
          </div>
          {totalPeople > 0 && (
            <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 ${
              dark
                ? 'border-brand-500/30 bg-brand-500/10'
                : 'border-brand-100 bg-brand-50'
            }`}>
              <span className="text-xs">{intensity.emoji}</span>
              <span className={`text-xs font-semibold ${
                dark ? 'text-brand-400' : 'text-brand-700'
              }`}>{intensity.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className={`relative grid grid-cols-3 divide-x border-b ${
        dark
          ? 'divide-dark-700 border-dark-700'
          : 'divide-charcoal-100 border-charcoal-100'
      }`}>
        {[
          { emoji: '👥', value: `${totalPeople}`, sub: totalPeople === 1 ? 'convidado' : 'convidados' },
          { emoji: '🥩', value: `${totalMeatKg.toFixed(1)}`, sub: 'quilos' },
          { emoji: '🍺', value: `${(totalBeerL + totalSodaL + totalWaterL).toFixed(0)}`, sub: 'litros' },
        ].map((stat, i) => (
          <div key={i} className="px-4 py-3 text-center">
            <span className="text-base">{stat.emoji}</span>
            <p className={`mt-0.5 text-lg font-extrabold tabular-nums ${
              dark ? 'text-dark-100' : 'text-charcoal-800'
            }`}>{stat.value}</p>
            <p className={`text-[10px] font-medium uppercase tracking-wider ${
              dark ? 'text-dark-500' : 'text-charcoal-400'
            }`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* People Visualization */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-4">
        {totalPeople > 0 ? (
          <>
            <div className="flex flex-wrap items-end justify-center gap-x-1.5 gap-y-1">
              {people.map((person, i) => (
                <PersonIcon key={person.key} type={person.type} index={i} />
              ))}
            </div>

            {totalPeople > displayCount && (
              <span className={`mt-2 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                dark
                  ? 'bg-dark-700 text-dark-300'
                  : 'bg-charcoal-100 text-charcoal-500'
              }`}>
                +{totalPeople - displayCount} pessoas
              </span>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center gap-5">
              {men > 0 && (
                <span className={`flex items-center gap-1.5 text-[11px] font-medium ${
                  dark ? 'text-dark-400' : 'text-charcoal-500'
                }`}>
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${
                    dark ? 'bg-brand-400' : 'bg-brand-500'
                  }`} />
                  {men} {men === 1 ? 'homem' : 'homens'}
                </span>
              )}
              {women > 0 && (
                <span className={`flex items-center gap-1.5 text-[11px] font-medium ${
                  dark ? 'text-dark-400' : 'text-charcoal-500'
                }`}>
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-400" />
                  {women} {women === 1 ? 'mulher' : 'mulheres'}
                </span>
              )}
              {kids > 0 && (
                <span className={`flex items-center gap-1.5 text-[11px] font-medium ${
                  dark ? 'text-dark-400' : 'text-charcoal-500'
                }`}>
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {kids} {kids === 1 ? 'criança' : 'crianças'}
                </span>
              )}
            </div>
          </>
        ) : (
          <div className={`flex flex-col items-center gap-2 py-8 ${
            dark ? 'text-dark-500' : 'text-charcoal-300'
          }`}>
            <svg className="h-16 w-16 opacity-30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span className="text-sm font-medium">Adicione pessoas ao churrasco</span>
          </div>
        )}
      </div>

      {/* Meter Bars */}
      {totalPeople > 0 && (
        <div className={`relative space-y-2.5 border-t px-5 py-4 ${
          dark ? 'border-dark-700' : 'border-charcoal-100'
        }`}>
          <MeterBar label="Carne total" icon="🥩" value={totalMeatKg} max={30} color="red" />
          <MeterBar label="Cerveja" icon="🍺" value={totalBeerL} max={80} color="amber" />
          <MeterBar label="Refrigerante + Água" icon="🥤" value={totalSodaL + totalWaterL} max={40} color="blue" />
        </div>
      )}

      {/* Bottom tags */}
      {totalPeople > 0 && (
        <div className={`relative border-t px-4 py-3 ${
          dark ? 'border-dark-700' : 'border-charcoal-100'
        }`}>
          <div className="flex flex-wrap gap-1.5">
            {result.meats.map((meat, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                  dark
                    ? 'border-red-500/20 bg-red-500/10 text-red-400'
                    : 'border-red-100 bg-red-50/60 text-red-700'
                }`}
              >
                {meat.emoji} {meat.quantity}
              </span>
            ))}
            {result.drinks.slice(0, 2).map((drink, i) => (
              <span
                key={`d${i}`}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                  dark
                    ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                    : 'border-amber-100 bg-amber-50/60 text-amber-700'
                }`}
              >
                {drink.emoji} {drink.quantity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
