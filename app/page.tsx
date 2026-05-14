import { Footer } from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import HeroCarouselSkeleton from "@/components/HeroCarouselSkeleton";
import RechargeForm from "@/components/RechargeForm";
import RechargeHistory from "@/components/RechargeHistory";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <main className="flex flex-1 w-full max-w-xl flex-col gap-6 items-center justify-between sm:items-start">
        <Suspense fallback={<HeroCarouselSkeleton />}>
          <HeroCarousel />
        </Suspense>
        <RechargeForm />
        <RechargeHistory />
        <Footer />
      </main>
    </div>
  );
}
