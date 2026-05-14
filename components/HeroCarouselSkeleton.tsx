const HeroCarouselSkeleton = () => {
  return (
    <div className="px-3 w-full mt-2">
      <div className="relative rounded-2xl overflow-hidden aspect-3/1 bg-gray-200 animate-pulse">
        {/* Dots skeleton */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          <div className="h-1.5 w-5 bg-white/50 rounded-full" />
          <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselSkeleton;
