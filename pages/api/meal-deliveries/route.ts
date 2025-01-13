import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const patientsWithMealPlans = await prisma.patient.findMany({
        include: {
          dietCharts: {
            include: {
              mealPlans: {
                include: {
                  mealDeliveries: true, 
                },
              },
            },
          },
        },
      });

      res.status(200).json(patientsWithMealPlans);
    } catch (error) {
      console.error('Error fetching patients with meal plans:', error);
      res.status(500).json({ error: 'Failed to fetch patients with meal plans' });
    }
  } else if (req.method === 'PUT') {
    const { deliveryId, status, notes } = req.body;

    if (!deliveryId || !status) {
      return res.status(400).json({ error: 'deliveryId and status are required' });
    }

    try {
      const updatedMealDelivery = await prisma.mealDelivery.update({
        where: {
          id: deliveryId, 
        },
        data: {
          status, 
          deliveredAt: status === 'DELIVERED' ? new Date() : null, 
          notes: notes || '', 
        },
      });

      res.status(200).json(updatedMealDelivery);
    } catch (error) {
      console.error('Error updating meal delivery:', error);
      res.status(500).json({ error: 'Failed to update meal delivery status' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
