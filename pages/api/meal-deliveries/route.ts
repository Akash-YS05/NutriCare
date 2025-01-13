import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all patients with their meal plans and related data
      const patientsWithMealPlans = await prisma.patient.findMany({
        include: {
          dietCharts: {
            include: {
              mealPlans: {
                include: {
                  mealDeliveries: true, // Include delivery details
                },
              },
            },
          },
        },
      });

      // Return the patients with meal plans in the response
      res.status(200).json(patientsWithMealPlans);
    } catch (error) {
      console.error('Error fetching patients with meal plans:', error);
      res.status(500).json({ error: 'Failed to fetch patients with meal plans' });
    }
  } else if (req.method === 'PUT') {
    // Destructure request body for meal delivery update
    const { deliveryId, status, notes } = req.body;

    // Check if deliveryId and status are provided
    if (!deliveryId || !status) {
      return res.status(400).json({ error: 'deliveryId and status are required' });
    }

    try {
      // Update the delivery status for a specific meal delivery
      const updatedMealDelivery = await prisma.mealDelivery.update({
        where: {
          id: deliveryId, // Locate the meal delivery by ID
        },
        data: {
          status, // Update the status
          deliveredAt: status === 'DELIVERED' ? new Date() : null, // Set deliveredAt if status is 'DELIVERED'
          notes: notes || '', // Optional notes
        },
      });

      res.status(200).json(updatedMealDelivery);
    } catch (error) {
      console.error('Error updating meal delivery:', error);
      res.status(500).json({ error: 'Failed to update meal delivery status' });
    }
  } else {
    // Return 405 Method Not Allowed for other request types
    res.status(405).json({ error: 'Method not allowed' });
  }
}
