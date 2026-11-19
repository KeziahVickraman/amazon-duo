import React from 'react';

export function AmazonSgLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`inline-flex items-baseline select-none ${className}`}>
      <div className="relative flex flex-col items-start leading-none">
        <span className="font-display text-[22px] font-bold tracking-tight text-white">
          amazon<span className="text-[13px] font-medium text-white/90">.sg</span>
        </span>
        {/* Signature smile arrow */}
        <svg
          viewBox="0 0 110 18"
          className="w-[74px] h-[11px] -mt-[3px] ml-[2px]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 3.5C28 15.5 68 16 95 4.5"
            stroke="#ff9900"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M89 1.5L98.5 3.5L94 12"
            stroke="#ff9900"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function PrimeBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5 select-none align-middle">
      <svg
        viewBox="0 0 14 14"
        className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 7.5L5.5 10.5L11.5 3.5"
          stroke="#ff9900"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-display font-bold tracking-tight text-[#00a8e1] ${
          compact ? 'text-[12px]' : 'text-[13px]'
        }`}
      >
        prime
      </span>
    </span>
  );
}

export function StarRating({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'xs' | 'sm' | 'md';
}) {
  const dim = size === 'xs' ? 'w-3.5 h-3.5' : size === 'sm' ? 'w-4 h-4' : 'w-[18px] h-[18px]';
  const stars = [1, 2, 3, 4, 5];

  return (
    <span
      className="inline-flex items-center gap-[1px]"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((star) => {
        const diff = rating - (star - 1);
        const fillType = diff >= 0.85 ? 'full' : diff >= 0.35 ? 'half' : 'empty';
        const gradId = `half-star-${star}-${Math.round(rating * 10)}`;
        return (
          <svg
            key={star}
            viewBox="0 0 20 20"
            className={dim}
            aria-hidden="true"
          >
            {fillType === 'half' && (
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#de7921" />
                  <stop offset="50%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.22l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.6z"
              fill={
                fillType === 'full'
                  ? '#de7921'
                  : fillType === 'half'
                  ? `url(#${gradId})`
                  : '#ffffff'
              }
              stroke="#de7921"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </span>
  );
}

export function formatSgdPriceParts(price: number): { whole: string; cents: string } {
  const fixed = price.toFixed(2);
  const [whole, cents] = fixed.split('.');
  return {
    whole: Number(whole).toLocaleString('en-SG'),
    cents,
  };
}

export function getDeliveryPromiseText(days: number, isPrime: boolean): {
  boldDate: string;
  prefix: string;
} {
  // Base reference date: Wed, 18 Nov 2026 from metadata
  const target = new Date(2026, 10, 18 + days);
  const weekday = target.toLocaleDateString('en-SG', { weekday: 'short' });
  const dayNum = target.getDate();
  const month = target.toLocaleDateString('en-SG', { month: 'short' });

  if (days === 1) {
    return {
      prefix: isPrime ? 'FREE delivery ' : 'Delivery ',
      boldDate: `Tomorrow, ${dayNum} ${month}`,
    };
  }
  return {
    prefix: isPrime ? 'FREE delivery ' : 'FREE delivery ',
    boldDate: `${weekday}, ${dayNum} ${month}`,
  };
}
