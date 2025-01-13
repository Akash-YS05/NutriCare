// pages/api/patients/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      return res.status(200).json({ patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
      return res.status(500).json({ error: 'Error fetching patients' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
