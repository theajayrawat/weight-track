import { NextResponse } from "next/server";
import { CONNECT_DB } from "@/app/lib/db";
import Distance from "@/app/lib/models/Distance";
import Hour from "@/app/lib/models/Hours";
import Weight from "@/app/lib/models/Weight";

const { CRON_SECRET } = process.env;

export async function GET(req) {
  try {
    await CONNECT_DB();

    // Verify Secret
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🗓 Get today's date (normalized)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ------------------ DISTANCE ------------------
    const distanceExists = await Distance.findOne({ date: today });

    if (!distanceExists) {
      await Distance.create({
        date: today,
        distance: 0,
        time: 0,
      });
    }

    // ------------------ HOURS ------------------
    const hourExists = await Hour.findOne({ date: today });

    if (!hourExists) {
      await Hour.create({
        date: today,
        devHour: 0,
        dsaHour: 0,
      });
    }

    // ------------------ WEIGHT ------------------
    const weightExists = await Weight.findOne({ date: today });

    if (!weightExists) {
      // 📅 Get previous day
      const previousDay = new Date(today);
      previousDay.setDate(previousDay.getDate() - 1);

      const previousWeight = await Weight.findOne({ date: previousDay });

      await Weight.create({
        date: today,
        weight: previousWeight ? previousWeight.weight : 0,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Checked and added today's entries if missing",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}