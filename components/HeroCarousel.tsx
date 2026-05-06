import Image from "next/image";

const HeroCarousel = () => {
  return (
    <div className="relative w-full aspect-21/9 rounded-xl overflow-hidden">
      <Image
        src="/Slider_1.jpg"
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HeroCarousel;
