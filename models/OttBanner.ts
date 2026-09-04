import { Schema, model, models } from "mongoose";

export interface IOttBanner {
  image: string;
  message: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OttBannerSchema = new Schema<IOttBanner>(
  {
    image: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.OttBanner ||
  model<IOttBanner>("OttBanner", OttBannerSchema);
