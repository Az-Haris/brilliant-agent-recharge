"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "1784410162";

type OttBanner = {
  _id: string;
  image: string;
  message: string;
};

const OttPromoBanner = () => {
  const [banners, setBanners] = useState<OttBanner[]>([]);

  useEffect(() => {
    fetch("/api/settings/ott-banners")
      .then((r) => r.json())
      .then((data) => setBanners(data.banners ?? []))
      .catch((err) => console.error("Failed to load OTT banners:", err));
  }, []);

  if (banners.length === 0) return null;

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="grid w-full grid-cols-2 gap-4 px-4">
      {banners.map((banner) => (
        <button
          key={banner._id}
          type="button"
          onClick={() => openWhatsApp(banner.message)}
          className="relative aspect-4/2 select-none overflow-hidden rounded-xl cursor-pointer"
        >
          <Image
            src={banner.image}
            alt="OTT offer"
            fill
            className="object-cover"
          />
        </button>
      ))}
    </section>
  );
};

export default OttPromoBanner;
