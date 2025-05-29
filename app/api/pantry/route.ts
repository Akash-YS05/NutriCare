import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const meals = await prisma.mealDelivery.findMany({
      include: {
        patient: { select: { name: true, floorNumber: true, roomNumber: true } },
        mealPlan: { select: { mealType: true } },
        deliveredBy: { select: { user: { select: { name: true } } } },
        preparedBy: { select: { user: { select: { name: true } } } },
      },
      orderBy: { scheduledFor: 'asc' },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: 'Internal Server Error' });
  }
}
