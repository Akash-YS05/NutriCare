import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
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
    })

    return NextResponse.json(patientsWithMealPlans)
  } catch (error) {
    console.error('Error fetching patients with meal plans:', error)
    return NextResponse.json({ error: 'Failed to fetch patients with meal plans' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { deliveryId, status, notes } = body

  if (!deliveryId || !status) {
    return NextResponse.json({ error: 'deliveryId and status are required' }, { status: 400 })
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
    })

    return NextResponse.json(updatedMealDelivery)
  } catch (error) {
    console.error('Error updating meal delivery:', error)
    return NextResponse.json({ error: 'Failed to update meal delivery status' }, { status: 500 })
  }
}
