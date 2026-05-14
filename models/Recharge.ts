import mongoose, { Schema, Document } from "mongoose";

export interface IRecharge extends Document {
  number: string;
  operator: string;
  amount: number;
  method: string;
  last4Digit: string;
  status: "Pending" | "Success";
  createdAt: Date;
}

const RechargeSchema = new Schema<IRecharge>(
  {
    number: { type: String, required: true },
    operator: { type: String, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    last4Digit: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Success"], default: "Pending" },
  },
  { timestamps: true },
);

export default mongoose.models.Recharge ||
  mongoose.model<IRecharge>("Recharge", RechargeSchema);
