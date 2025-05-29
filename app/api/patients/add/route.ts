import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const patient = await prisma.patient.create({
      data: {
        name: body.name,
        age: parseInt(body.age),
        gender: body.gender,
        floorNumber: body.floorNumber,
        roomNumber: body.roomNumber,
        bedNumber: body.bedNumber,
        contactInfo: body.contactInfo,
        emergencyContact: body.emergencyContact,
        diseases: body.diseases || [],
        allergies: body.allergies || [],
        dietCharts: {
          create: body.dietCharts.map((chart: DietChart) => ({
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

    return NextResponse.json({ patient });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json({ error: "Error creating patient" }, { status: 500 });
  }
}
