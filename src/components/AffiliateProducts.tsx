import { useTheme } from '../hooks/useTheme';

interface Product {
  name: string;
  emoji: string;
  description: string;
  url: string;
  badge?: string;
}

const products: Product[] = [
  {
    name: 'Kit Churrasco Inox',
    emoji: '🔥',
    description: 'Jogo de Churrasco Tradicional 3 Peças - Tramontina',
    url: 'https://amzn.to/3O16yAd',
    badge: 'Mais vendido',
  },
  {
    name: 'Acendedor de Carvão',
    emoji: '♨️',
    description: 'Acendedor Carvão Lenha Bastão - 15 Unidades',
    url: 'https://amzn.to/46CZ7W9',
  },
  {
    name: 'Termômetro Digital',
    emoji: '🌡️',
    description: 'Ponto perfeito da carne toda vez',
    url: 'https://amzn.to/4rcz14U',
    badge: 'Essencial',
  },
  {
    name: 'Luvas Térmicas',
    emoji: '🧤',
    description: 'Profissional Até 600ºC De 10 a 15 Segundo',
    url: 'https://amzn.to/4tptoS2',
  },
  {
    name: 'Tábua de Corte Bambu',
    emoji: '🪵',
    description: 'Grande, resistente e fácil de limpar',
    url: 'https://amzn.to/4cf4Y7F',
  },
  {
    name: 'Kit Temperos Premium',
    emoji: '🧂',
    description: 'Salsa, Páprica Doce, Tomilho, Manjericão e Mostarda e mais',
    url: 'https://amzn.to/4qhTCmN',
  },
];

export function AffiliateProducts() {
  const { dark } = useTheme();

  return (
    <section className="animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🛒</span>
        <h3 className={`text-lg font-bold ${dark ? 'text-dark-100' : 'text-charcoal-800'}`}>
          Equipamentos Recomendados
        </h3>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`group relative flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 hover:shadow-md active:scale-[0.98] ${
              dark
                ? 'border-dark-700 bg-dark-900 hover:border-dark-600 hover:bg-dark-850'
                : 'border-charcoal-100 bg-white hover:border-charcoal-200 hover:bg-charcoal-50/50'
            }`}
          >
            {/* Badge */}
            {product.badge && (
              <span className="absolute -top-2 right-3 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {product.badge}
              </span>
            )}

            {/* Emoji icon */}
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${
              dark ? 'bg-dark-800' : 'bg-charcoal-50'
            }`}>
              {product.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold leading-tight ${
                dark ? 'text-dark-200' : 'text-charcoal-800'
              }`}>
                {product.name}
              </h4>
              <p className={`mt-0.5 text-xs leading-relaxed ${
                dark ? 'text-dark-400' : 'text-charcoal-500'
              }`}>
                {product.description}
              </p>
              <span className={`mt-2 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
                dark
                  ? 'bg-brand-500/15 text-brand-400 group-hover:bg-brand-500/25'
                  : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'
              }`}>
                Ver preço na Amazon
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Disclaimer */}
      <p className={`mt-3 text-center text-[11px] ${
        dark ? 'text-dark-600' : 'text-charcoal-400'
      }`}>
        🔗 Links de afiliado Amazon — você não paga nada a mais e nos ajuda a manter o site
      </p>
    </section>
  );
}
