import React, { useEffect, useMemo, useRef, useState } from 'react';

type TestimonialItem = {
  src: string;
  alt?: string;
  name?: string;
  dayResult?: string;
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
  const [availableItems, setAvailableItems] = useState<TestimonialItem[]>([]);
  const [assetsChecked, setAssetsChecked] = useState(false);

  useEffect(() => {
    let canceled = false;
    setAssetsChecked(false);

    const checks = normalized.map(
      (item) =>
        new Promise<TestimonialItem | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(item);
          img.onerror = () => resolve(null);
          img.src = item.src;
        })
    );

    Promise.all(checks)
      .then((results) => {
        if (canceled) return;
        setAvailableItems(results.filter(Boolean) as TestimonialItem[]);
      })
      .finally(() => {
        if (canceled) return;
        setAssetsChecked(true);
      });

    return () => {
      canceled = true;
    };
  }, [normalized]);

  const hasLoop = availableItems.length > 1;
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!assetsChecked) return;
    if (availableItems.length === 0) return;
    setIndex((current) => {
      const max = availableItems.length - 1;
      return Math.max(0, Math.min(current, max));
    });
  }, [assetsChecked, availableItems.length]);

  const goTo = (nextIndex: number) => {
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    setIsFading(true);
    fadeTimerRef.current = window.setTimeout(() => {
      setIndex(nextIndex);
      setIsFading(false);
    }, 140);
  };

  const goPrev = () => {
    if (!hasLoop) return;
    const len = availableItems.length;
    const nextIndex = (index - 1 + len) % len;
    goTo(nextIndex);
  };

  const goNext = () => {
    if (!hasLoop) return;
    const len = availableItems.length;
    const nextIndex = (index + 1) % len;
    goTo(nextIndex);
  };

  useEffect(() => {
    if (!hasLoop) return;
    const id = window.setInterval(() => {
      const len = availableItems.length;
      if (len <= 1) return;
      goTo((index + 1) % len);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [availableItems.length, hasLoop, index, intervalMs]);

  if (!assetsChecked) return null;
  if (availableItems.length === 0) return null;

  const item = availableItems[index];

  return (
    <div className={[
      'relative w-full',
      className ?? '',
    ].join(' ')}>
      <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-nexus-green/10 via-transparent to-nexus-cyan/10 blur-3xl opacity-60 pointer-events-none" />

      <div
        className="relative overflow-hidden rounded-3xl border border-gray-800 bg-nexus-card"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-nexus-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-nexus-card to-transparent" />

        {hasLoop && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-gray-800 bg-nexus-dark/70 text-gray-100 hover:border-nexus-green/40 transition-colors"
              aria-label="Anterior"
            >
              <span className="text-xl leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-gray-800 bg-nexus-dark/70 text-gray-100 hover:border-nexus-green/40 transition-colors"
              aria-label="Próximo"
            >
              <span className="text-xl leading-none">›</span>
            </button>
          </>
        )}

        <div className="relative py-4 px-4 sm:px-6">
          <div className="mx-auto w-full max-w-[420px]">
            <div
              className={[
                'relative overflow-hidden rounded-2xl border border-gray-800 bg-nexus-dark/40 shadow-[0_0_40px_rgba(0,231,1,0.08)]',
                'transition-opacity duration-200',
                isFading ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-nexus-green/10 via-transparent to-nexus-cyan/10" />
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-nexus-green/15 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-nexus-cyan/15 blur-3xl" />

              <div className="relative p-3 sm:p-4">
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-900 bg-black/60 aspect-[9/16]">
                  <img
                    key={item.src}
                    src={item.src}
                    alt={item.alt ?? 'Depoimento'}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    onError={() => {
                      setAvailableItems((prev) => prev.filter((p) => p.src !== item.src));
                    }}
                  />

                  {(item.name || item.dayResult) && (
                    <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2">
                      {item.name ? (
                        <div className="rounded-full border border-gray-800 bg-black/45 px-3 py-1 text-[12px] font-extrabold text-gray-100 backdrop-blur-md">
                          {item.name}
                        </div>
                      ) : (
                        <div />
                      )}

                      {item.dayResult ? (
                        <div className="text-right">
                          <div className="rounded-full border border-nexus-green/30 bg-nexus-green/10 px-3 py-1 text-[12px] font-black text-nexus-green backdrop-blur-md shadow-[0_0_18px_rgba(0,231,1,0.22)]">
                            {item.dayResult}
                          </div>
                          <div className="mt-1 text-[10px] font-bold text-gray-300/80">em 1 dia</div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
