import { useState } from 'react';

interface DishImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIconClass?: string;
}

export function DishImage({
  src,
  alt,
  className = '',
  fallbackIconClass = 'ri-restaurant-line',
}: DishImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EEF5EE] to-[#DCE6E0] text-[#489742] p-3 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <i className={`${fallbackIconClass} text-2xl mb-1`} aria-hidden="true" />
        <span className="text-[11px] font-medium text-[#354439] line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
