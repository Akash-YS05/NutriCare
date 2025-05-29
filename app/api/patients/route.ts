import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const patients = await prisma.patient.findMany({
        include: {
          dietCharts: {
            include: {
              mealPlans: true,  
            },
          },
        },
      });
      return NextResponse.json({ patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
      return NextResponse.json({ error: 'Error fetching patients' });
    }
  }

  return NextResponse.json({ error: 'Method Not Allowed' });
}
