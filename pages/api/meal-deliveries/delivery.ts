import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';
import { DeliveryStatus } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
          // Fetch all meal deliveries without filtering by status
          const mealDeliveries = await prisma.mealDelivery.findMany({
            include: {
              patient: true,
              mealPlan: true,
            },
          });
          res.status(200).json(mealDeliveries);
        } catch (error) {
          console.error('Error fetching meal deliveries:', error);
          res.status(500).json({ error: 'Failed to fetch meal deliveries' });
        }
      }
        else if (req.method === 'PUT') {
    const { deliveryId, status, notes } = req.body;

    try {
      const updatedMealDelivery = await prisma.mealDelivery.update({
        where: {
          id: deliveryId,
        },
        data: {
          status,  // Update the status based on the provided status
          deliveredAt: status === 'DELIVERED' ? new Date() : null,  // Set timestamp when delivered
          notes,  // Optional notes
        },
      });

      res.status(200).json(updatedMealDelivery);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating meal delivery status.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
