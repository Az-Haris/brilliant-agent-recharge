import { Schema, model, models } from "mongoose";

export interface IHeroSlide {
  image: string;
  title: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.HeroSlide ||
  model<IHeroSlide>("HeroSlide", HeroSlideSchema);
