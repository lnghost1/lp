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

  const extended = useMemo(() => {
    if (!hasLoop) return availableItems;
    const first = availableItems[0];
    const last = availableItems[availableItems.length - 1];
    return [last, ...availableItems, first];
  }, [hasLoop, availableItems]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [index, setIndex] = useState(hasLoop ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const indexRef = useRef(index);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartIndexRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const update = () => {
      setContainerWidth(el.clientWidth);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex(hasLoop ? 1 : 0);
  }, [hasLoop]);

  useEffect(() => {
    if (!assetsChecked) return;
    if (availableItems.length === 0) return;
    setIndex((current) => {
      if (!hasLoop) return 0;
      const lastRealIndex = availableItems.length;
      if (current < 0) return 1;
      if (current > lastRealIndex + 1) return 1;
      return current;
    });
  }, [assetsChecked, availableItems.length, hasLoop]);

  useEffect(() => {
    if (!hasLoop) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [hasLoop, intervalMs]);

  const handleTransitionEnd = () => {
    if (!hasLoop) return;

    const lastRealIndex = availableItems.length;

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

  const goPrev = () => {
    if (!hasLoop) return;
    setIndex((i) => i - 1);
  };

  const goNext = () => {
    if (!hasLoop) return;
    setIndex((i) => i + 1);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!hasLoop) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartIndexRef.current = indexRef.current;
    setWithTransition(false);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDraggingRef.current) return;
    setDragOffset(e.clientX - dragStartXRef.current);
  };

  const onPointerUpOrCancel: React.PointerEventHandler<HTMLDivElement> = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const slideWidth = Math.max(280, Math.round(containerWidth * 0.82));
    const threshold = Math.max(60, Math.round(slideWidth * 0.18));

    const offset = dragOffset;
    setDragOffset(0);
    setWithTransition(true);

    if (offset <= -threshold) {
      setIndex(dragStartIndexRef.current + 1);
      return;
    }

    if (offset >= threshold) {
      setIndex(dragStartIndexRef.current - 1);
      return;
    }

    setIndex(dragStartIndexRef.current);
  };

  if (!assetsChecked) return null;
  if (availableItems.length === 0) return null;

  const slideWidth = Math.max(280, Math.round(containerWidth * 0.82));
  const gap = 16;
  const sidePad = Math.max(0, Math.round((containerWidth - slideWidth) / 2));
  const translateX = index * (slideWidth + gap) - sidePad - dragOffset;

  return (
    <div className={[
      'relative w-full',
      className ?? '',
    ].join(' ')}>
      <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-nexus-green/10 via-transparent to-nexus-cyan/10 blur-3xl opacity-60 pointer-events-none" />

      <div
        ref={containerRef}
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

        <div
          className="relative"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUpOrCancel}
          onPointerCancel={onPointerUpOrCancel}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex gap-4 py-4"
            style={{
              paddingLeft: sidePad,
              paddingRight: sidePad,
              transform: `translateX(-${translateX}px)`,
              transition: withTransition ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="shrink-0"
                style={{ width: slideWidth }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-nexus-dark/40 shadow-[0_0_40px_rgba(0,231,1,0.08)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-nexus-green/10 via-transparent to-nexus-cyan/10" />
                  <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-nexus-green/15 blur-3xl" />
                  <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-nexus-cyan/15 blur-3xl" />

                  <div className="relative p-3 sm:p-4">
                    <div className="relative w-full overflow-hidden rounded-xl border border-gray-900 bg-black/60 aspect-[9/16] sm:aspect-square">
                      <img
                        src={item.src}
                        alt={item.alt ?? 'Depoimento'}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        onError={() => {
                          setAvailableItems((prev) => {
                            const next = prev.filter((p) => p.src !== item.src);
                            return next;
                          });
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
