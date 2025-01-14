import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
interface MealPlan {
  mealType: string;
  ingredients: string[];
  instructions: string;
}

interface DietChart {
  startDate: string;
  endDate?: string | null;
  mealPlans: MealPlan[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const patient = await prisma.patient.create({
      data: {
        name: req.body.name,
        age: parseInt(req.body.age),
        gender: req.body.gender,
        floorNumber: req.body.floorNumber,
        roomNumber: req.body.roomNumber,
        bedNumber: req.body.bedNumber,
        contactInfo: req.body.contactInfo,
        emergencyContact: req.body.emergencyContact,
        diseases: req.body.diseases || [],
        allergies: req.body.allergies || [],
        dietCharts: {
          create: req.body.dietCharts.map((chart: DietChart) => ({
            startDate: new Date(chart.startDate),
            endDate: chart.endDate ? new Date(chart.endDate) : null,
            mealPlans: {
              create: chart.mealPlans.map((meal: MealPlan) => ({
                mealType: meal.mealType,
                ingredients: meal.ingredients,
                instructions: meal.instructions,
              })),
            },
          })),
        },
      },
      include: {
        dietCharts: {
          include: {
            mealPlans: true,
          },
        },
      },
    });

    return res.status(200).json({ patient });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ error: "Error creating patient" });
  }
}
