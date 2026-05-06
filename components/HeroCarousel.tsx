import Image from "next/image";

const HeroCarousel = () => {
  return (
    <div className="relative w-full aspect-21/6 rounded-xl overflow-hidden mt-4">
      <Image
        src="/Slider_1.jpg"
        alt="Hero Banner"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HeroCarousel;
