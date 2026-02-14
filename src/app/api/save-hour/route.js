import { NextResponse } from 'next/server';
import Hour from "@/app/lib/models/Hours";
import { CONNECT_DB } from '@/app/lib/db';

export async function POST(request) {
  try {
    await CONNECT_DB();
    const body = await request.json();
    const { date, dsaHour, devHour } = body;

  if (typeof devHour !== 'number' || typeof dsaHour !== 'number' || !date) {
    return NextResponse.json({ error: 'Invalid or missing data' }, { status: 400 });
  }

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const savedData = await Hour.findOneAndUpdate(
      { date: entryDate }, 
      { devHour: devHour, dsaHour: dsaHour },
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
    const data = await Hour.find().sort({ date: 1 });
    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}