"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { id: 1, src: "/sliders/Slider_1.jpeg", alt: "Offer banner 1" },
  { id: 2, src: "/sliders/Slider_2.jpeg", alt: "Offer banner 2" },
  { id: 3, src: "/sliders/Slider_3.jpeg", alt: "Offer banner 3" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startX = useRef<number | null>(null);

  const goTo = (i: number) => setCurrent((i + slides.length) % slides.length);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

  return (
    <div className="px-3 w-full mt-2">
      <div
        className="relative rounded-2xl overflow-hidden aspect-3/1 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 bg-black/50 py-1 rounded-full max-w-20 mx-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                resetTimer();
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 bg-white ${
                i === current ? "w-5" : "w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
