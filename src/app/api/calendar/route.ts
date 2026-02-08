import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { calendarEventSchema } from "@/lib/validations";

export async function GET() {
  try {
    const events = await prisma.calendarEvent.findMany({
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
    return NextResponse.json(
      events.map((e) => ({
        ...e,
        attendees: JSON.parse(e.attendees),
      }))
    );
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = calendarEventSchema.parse(body);

    const event = await prisma.calendarEvent.create({
      data: {
        title: validated.title,
        date: new Date(validated.date),
        time: validated.time,
        duration: validated.duration,
        type: validated.type,
        attendees: JSON.stringify(validated.attendees),
        location: validated.location,
      },
    });

    return NextResponse.json(
      { ...event, attendees: JSON.parse(event.attendees) },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Failed to create calendar event:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}
