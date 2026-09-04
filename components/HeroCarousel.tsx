"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  _id: string;
  image: string;
  title: string;
};

const HeroCarousel = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/settings/hero-slides")
      .then((r) => r.json())
      .then((data) => setSlides(data.slides ?? []))
      .catch((err) => console.error("Failed to load hero slides:", err));
  }, []);

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff > 0 ? 1 : -1));
      resetTimer();
    }
    startX.current = null;
  };

  if (slides.length === 0) return null;

  return (
    <div className="mt-2 w-full px-3">
      <div
        className="relative aspect-3/1 select-none overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {slides.length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 mx-auto flex max-w-20 justify-center gap-1.5 rounded-full bg-black/30 py-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i);
                  resetTimer();
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full bg-white/50 transition-all duration-300 ${
                  i === current ? "w-5" : "w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;
