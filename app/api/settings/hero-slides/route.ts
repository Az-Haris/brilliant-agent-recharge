import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";

export async function GET() {
  try {
    await connectDB();
    const slides = await HeroSlide.find().sort({ order: 1 });
    return NextResponse.json({ slides });
  } catch (err) {
    console.error("GET /api/settings/hero-slides failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 },
    );
  }
}
