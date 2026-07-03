import { NextResponse } from "next/server";
import { getAllStorms } from "@/services/storm-service";

// Revalidate every 5 minutes — matches a realistic polling interval
// for tropical cyclone bulletins once real data is wired in.
export const revalidate = 300;

export async function GET() {
  try {
    const storms = await getAllStorms();
    return NextResponse.json({ data: storms }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/storms]", error);
    return NextResponse.json(
      { error: "Failed to load storm data" },
      { status: 500 },
    );
  }
}
