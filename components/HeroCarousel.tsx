import Image from "next/image";

const HeroCarousel = () => {
  return (
    <div className="relative w-full aspect-21/9 rounded-b-xl overflow-hidden">
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
