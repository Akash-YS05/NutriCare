// pages/api/patients/add.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
// Define the Patient, DietChart, and MealPlan types based on the Prisma schema
interface MealPlanInput {
  mealType: "MORNING" | "EVENING" | "NIGHT";
  ingredients: string[];
  instructions: string[];
}

interface DietChartInput {
  startDate: string;
  endDate?: string;
  mealPlans: MealPlanInput[];
}

interface PatientInput {
  name: string;
  contactInfo: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  floorNumber: string;
  roomNumber: string;
  bedNumber: string;
  emergencyContact: string;
  diseases?: string[];
  allergies?: string[];
  dietCharts: DietChartInput[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const patientData: PatientInput = req.body;

      const patient = await prisma.patient.create({
        data: {
          name: patientData.name,
          contactInfo: patientData.contactInfo,
          age: patientData.age,
          gender: patientData.gender,
          floorNumber: patientData.floorNumber,
          roomNumber: patientData.roomNumber,
          bedNumber: patientData.bedNumber,
          emergencyContact: patientData.emergencyContact,
          diseases: patientData.diseases,
          allergies: patientData.allergies,
          dietCharts: {
            create: patientData.dietCharts.map((chart) => ({
              startDate: new Date(chart.startDate),
              endDate: chart.endDate ? new Date(chart.endDate) : null,
              mealPlans: {
                create: chart.mealPlans.map((mealPlan) => ({
                  mealType: mealPlan.mealType,
                  ingredients: mealPlan.ingredients,
                  instructions: mealPlan.instructions,
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
      console.error("Error adding patient:", error);
      return res.status(500).json({ error: "Failed to add patient" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
