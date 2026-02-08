import { NextResponse } from 'next/server';
import Distance from "@/app/lib/models/Distance";
import { CONNECT_DB } from '@/app/lib/db';

export async function POST(request) {
  try {
    await CONNECT_DB();
    const body = await request.json();
    const { date, distance, time } = body;

    if (!distance || !date || !time) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const savedData = await Distance.findOneAndUpdate(
      { date: entryDate }, 
      { distance: distance, time: time },
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
    const data = await Distance.find().sort({ date: 1 });
    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}