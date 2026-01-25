import { NextResponse } from 'next/server';
import Weight from "@/app/lib/models/Weight";
import { CONNECT_DB } from '@/app/lib/db';

export async function POST(request) {
  try {
    await CONNECT_DB();
    const body = await request.json();
    const { date, weight } = body;

    if (!weight || !date) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 1. Normalize the date to Midnight (Start of Day)
    // This ensures Oct 25 at 10am and Oct 25 at 8pm match the same "Day"
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    // 2. Find and Update (Upsert)
    // filter: { date: entryDate } -> Search for this specific midnight date
    // update: { weight: weight } -> Update the weight value
    // options: { upsert: true, new: true } -> Create if missing, return the new doc
    const savedData = await Weight.findOneAndUpdate(
      { date: entryDate }, 
      { weight: weight },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, data: savedData });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await CONNECT_DB();
    const data = await Weight.find().sort({ date: 1 });
    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}