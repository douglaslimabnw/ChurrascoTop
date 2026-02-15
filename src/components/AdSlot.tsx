import { useTheme } from '../hooks/useTheme';

interface AdSlotProps {
  format?: 'horizontal' | 'small';
  className?: string;
}

export function AdSlot({ format = 'horizontal', className = '' }: AdSlotProps) {
  const { dark } = useTheme();

  return (
    <div className={`${className} overflow-hidden`}>
      <div
        className={`
          flex items-center justify-center rounded-lg border border-dashed text-xs
          ${format === 'horizontal' ? 'h-[60px] w-full' : 'h-[50px] w-full'}
          ${dark
            ? 'border-dark-700 bg-dark-800/50 text-dark-600'
            : 'border-charcoal-200 bg-charcoal-50/50 text-charcoal-400'
          }
        `}
      >
        {/* 
          Google AdSense Ad Unit - Troque XXXXXXXXXX pelo data-ad-slot gerado no painel do AdSense:
          
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-3220309716820755"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        */}
        <span className="opacity-40 select-none">Espaço publicitário</span>
      </div>
    </div>
  );
}
