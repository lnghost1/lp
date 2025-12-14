import React, { useEffect, useMemo, useRef, useState } from 'react';

type TestimonialItem = {
  src: string;
  alt?: string;
};

type TestimonialsCarouselProps = {
  items: TestimonialItem[];
  intervalMs?: number;
  className?: string;
};

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  items,
  intervalMs = 15000,
  className,
}) => {
  const normalized = useMemo(() => items.filter(Boolean), [items]);
  const hasLoop = normalized.length > 1;

  const extended = useMemo(() => {
    if (!hasLoop) return normalized;
    const first = normalized[0];
    const last = normalized[normalized.length - 1];
    return [last, ...normalized, first];
  }, [hasLoop, normalized]);

  const [index, setIndex] = useState(hasLoop ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setIndex(hasLoop ? 1 : 0);
  }, [hasLoop]);

  useEffect(() => {
    if (!hasLoop) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [hasLoop, intervalMs]);

  const handleTransitionEnd = () => {
    if (!hasLoop) return;

    const lastRealIndex = normalized.length;

    if (indexRef.current === 0) {
      setWithTransition(false);
      setIndex(lastRealIndex);
      requestAnimationFrame(() => setWithTransition(true));
      return;
    }

    if (indexRef.current === lastRealIndex + 1) {
      setWithTransition(false);
      setIndex(1);
      requestAnimationFrame(() => setWithTransition(true));
    }
  };

  if (normalized.length === 0) return null;

  return (
    <div className={[
      'relative w-full',
      className ?? '',
    ].join(' ')}>
      <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-nexus-green/10 via-transparent to-nexus-cyan/10 blur-3xl opacity-60 pointer-events-none" />

      <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-nexus-card">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-nexus-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-nexus-card to-transparent" />

        <div
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: withTransition ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((item, i) => (
            <div key={`${item.src}-${i}`} className="w-full shrink-0 p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-nexus-dark/40 shadow-[0_0_40px_rgba(0,231,1,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-nexus-green/10 via-transparent to-nexus-cyan/10" />
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-nexus-green/15 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-nexus-cyan/15 blur-3xl" />

                <div className="relative p-3 sm:p-4">
                  <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-900 bg-black/30">
                    <img
                      src={item.src}
                      alt={item.alt ?? 'Depoimento'}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
