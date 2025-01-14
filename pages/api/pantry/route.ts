
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

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

    return res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
