import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { deliveryId, status } = req.body;

    if (!deliveryId || !status) {
      return res.status(400).json({ error: 'deliveryId and status are required' });
    }

    try {
      const updatedMealDelivery = await prisma.mealDelivery.update({
        where: { 
            id: deliveryId 
        },
        data: { 
            status 
        },
      });

      return res.status(200).json(updatedMealDelivery);
    } catch (error) {
      console.error('Error updating meal delivery:', error);
      return res.status(500).json({ error: 'Error updating meal delivery status' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
