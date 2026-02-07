import { useState, useMemo } from 'react';

export interface ChurrascoConfig {
  totalPeople: number;
  men: number;
  women: number;
  kids: number;
  duration: number; // hours
  beerDrinkers: number;
  softDrinkOnly: number;
  includeChicken: boolean;
  includeSausage: boolean;
  includePork: boolean;
  includeCheese: boolean;
  includeBread: boolean;
  includeGarlic: boolean;
  includeVinaigrette: boolean;
  includeRice: boolean;
  includeFarofa: boolean;
}

export interface ChurrascoResult {
  meats: { name: string; emoji: string; quantity: string; kg: number }[];
  drinks: { name: string; emoji: string; quantity: string; liters: number }[];
  sides: { name: string; emoji: string; quantity: string }[];
  extras: { name: string; emoji: string; quantity: string }[];
}

const initialConfig: ChurrascoConfig = {
  totalPeople: 10,
  men: 5,
  women: 3,
  kids: 2,
  duration: 4,
  beerDrinkers: 5,
  softDrinkOnly: 3,
  includeChicken: true,
  includeSausage: true,
  includePork: false,
  includeCheese: true,
  includeBread: true,
  includeGarlic: true,
  includeVinaigrette: true,
  includeRice: true,
  includeFarofa: true,
};

export function useChurrasco() {
  const [config, setConfig] = useState<ChurrascoConfig>(initialConfig);

  const updateConfig = (updates: Partial<ChurrascoConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...updates };
      // Auto-adjust people breakdown
      if ('totalPeople' in updates) {
        const total = updates.totalPeople!;
        next.men = Math.round(total * 0.5);
        next.women = Math.round(total * 0.3);
        next.kids = total - next.men - next.women;
        if (next.kids < 0) {
          next.women += next.kids;
          next.kids = 0;
        }
        next.beerDrinkers = Math.round((next.men + next.women) * 0.7);
        next.softDrinkOnly = next.men + next.women - next.beerDrinkers + next.kids;
      }
      return next;
    });
  };

  const updatePeopleBreakdown = (field: 'men' | 'women' | 'kids', value: number) => {
    setConfig(prev => {
      const next = { ...prev, [field]: value };
      next.totalPeople = next.men + next.women + next.kids;
      next.beerDrinkers = Math.min(next.beerDrinkers, next.men + next.women);
      next.softDrinkOnly = next.totalPeople - next.beerDrinkers;
      return next;
    });
  };

  const result = useMemo<ChurrascoResult>(() => {
    const { men, women, kids, duration, beerDrinkers, softDrinkOnly } = config;
    const durationFactor = Math.max(1, duration / 4);

    // Meat calculation (per person for 4h, adjusted by duration)
    const beefPerMan = 0.4 * durationFactor;
    const beefPerWoman = 0.25 * durationFactor;
    const beefPerKid = 0.15 * durationFactor;
    const totalBeef = men * beefPerMan + women * beefPerWoman + kids * beefPerKid;

    const meats: ChurrascoResult['meats'] = [
      { name: 'Carne Bovina', emoji: '🥩', quantity: `${totalBeef.toFixed(1)} kg`, kg: totalBeef },
    ];

    if (config.includeChicken) {
      const chicken = (men + women) * 0.15 * durationFactor + kids * 0.1 * durationFactor;
      meats.push({ name: 'Frango', emoji: '🍗', quantity: `${chicken.toFixed(1)} kg`, kg: chicken });
    }
    if (config.includeSausage) {
      const sausage = (men + women + kids) * 0.1 * durationFactor;
      meats.push({ name: 'Linguiça', emoji: '🌭', quantity: `${sausage.toFixed(1)} kg`, kg: sausage });
    }
    if (config.includePork) {
      const pork = (men + women) * 0.15 * durationFactor + kids * 0.08 * durationFactor;
      meats.push({ name: 'Porco', emoji: '🐷', quantity: `${pork.toFixed(1)} kg`, kg: pork });
    }

    // Drinks
    const beerLiters = beerDrinkers * 1.5 * durationFactor;
    const beerCans = Math.ceil(beerLiters / 0.35);
    const sodaLiters = softDrinkOnly * 0.6 * durationFactor + beerDrinkers * 0.2 * durationFactor;
    const waterLiters = (men + women + kids) * 0.3 * durationFactor;

    const drinks: ChurrascoResult['drinks'] = [
      { name: 'Cerveja', emoji: '🍺', quantity: `${beerCans} latas (${beerLiters.toFixed(0)}L)`, liters: beerLiters },
      { name: 'Refrigerante', emoji: '🥤', quantity: `${sodaLiters.toFixed(1)} litros`, liters: sodaLiters },
      { name: 'Água', emoji: '💧', quantity: `${waterLiters.toFixed(1)} litros`, liters: waterLiters },
    ];

    // Sides
    const sides: ChurrascoResult['sides'] = [];
    const total = men + women + kids;

    if (config.includeRice) {
      const rice = total * 0.08;
      sides.push({ name: 'Arroz', emoji: '🍚', quantity: `${rice.toFixed(1)} kg` });
    }
    if (config.includeFarofa) {
      const farofa = total * 0.05;
      sides.push({ name: 'Farofa', emoji: '🥄', quantity: `${farofa.toFixed(1)} kg` });
    }
    if (config.includeVinaigrette) {
      sides.push({ name: 'Vinagrete', emoji: '🥗', quantity: `${Math.ceil(total / 5)} porções` });
    }

    // Extras
    const extras: ChurrascoResult['extras'] = [];
    if (config.includeCheese) {
      const cheese = total * 0.05;
      extras.push({ name: 'Queijo Coalho', emoji: '🧀', quantity: `${cheese.toFixed(1)} kg` });
    }
    if (config.includeBread) {
      const bread = total * 1.5;
      extras.push({ name: 'Pão de Alho', emoji: '🍞', quantity: `${Math.ceil(bread)} unidades` });
    }
    if (config.includeGarlic) {
      extras.push({ name: 'Alho', emoji: '🧄', quantity: `${Math.ceil(total / 5)} cabeças` });
    }

    // Charcoal & ice
    const charcoal = Math.ceil(total / 5);
    const ice = Math.ceil(total * 1.5);
    extras.push({ name: 'Carvão', emoji: '⬛', quantity: `${charcoal} kg` });
    extras.push({ name: 'Gelo', emoji: '🧊', quantity: `${ice} kg` });

    return { meats, drinks, sides, extras };
  }, [config]);

  return { config, updateConfig, updatePeopleBreakdown, result };
}
