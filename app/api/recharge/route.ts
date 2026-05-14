import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Recharge from "@/models/Recharge";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { number, operator, amount, method, last4Digit } = body;

    if (!number || !operator || !amount || !method || !last4Digit) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const recharge = await Recharge.create({
      number,
      operator,
      amount,
      method,
      last4Digit,
    });
    return NextResponse.json({ success: true, recharge }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    // Return latest 10, mask the number for privacy
    const records = await Recharge.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const masked = records.map((r) => ({
      ...r,
      number: r.number.slice(0, 3) + "******" + r.number.slice(-2),
    }));

    return NextResponse.json({ records: masked });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
