import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSlotProps {
  format?: 'horizontal' | 'small' | 'auto';
  className?: string;
  slotId?: string;
}

export function AdSlot({ 
  format = 'horizontal', 
  className = '', 
  slotId = '6665042861' // Valor padrão (exemplo), o usuário deve trocar pelo dele
}: AdSlotProps) {
  const { dark } = useTheme();

  useEffect(() => {
    // Tenta carregar o anúncio após o componente montar
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`${className} min-h-[60px] overflow-hidden rounded-lg border border-dashed transition-colors ${
      dark
        ? 'border-dark-700 bg-dark-800/50 text-dark-600'
        : 'border-charcoal-200 bg-charcoal-50/50 text-charcoal-400'
    }`}>
      {/* 
        Google AdSense Ad Unit 
        data-ad-client: ca-pub-3220309716820755 (já configurado no index.html)
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-3220309716820755"
        data-ad-slot={slotId}
        data-ad-format={format === 'small' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      />
      
      {/* Fallback visual suave caso não carregue/esteja em dev */}
      <div className="flex h-full w-full items-center justify-center p-2 text-[10px] opacity-20 select-none">
        Publicidade
      </div>
    </div>
  );
}
