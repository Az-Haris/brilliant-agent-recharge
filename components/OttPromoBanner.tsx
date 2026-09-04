import Image from "next/image";
import React from "react";

const OttPromoBanner = () => {
  return (
    <section className="w-full px-4 grid grid-cols-2 gap-4">
      <div className="relative rounded-xl overflow-hidden aspect-4/2 select-none">
        <Image
          src="/sliders/Slider_4.jpeg"
          alt="Offer banner 4"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-4/2 select-none">
        <Image
          src="/sliders/Slider_4.jpeg"
          alt="Offer banner 4"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default OttPromoBanner;
