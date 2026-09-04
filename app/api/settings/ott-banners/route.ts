import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OttBanner from "@/models/OttBanner";

export async function GET() {
  try {
    await connectDB();
    const banners = await OttBanner.find().sort({ order: 1 });
    return NextResponse.json({ banners });
  } catch (err) {
    console.error("GET /api/settings/ott-banners failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 },
    );
  }
}
