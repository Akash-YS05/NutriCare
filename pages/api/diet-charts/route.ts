import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      )
    }

    try {
        const json = await req.json();
        const dietChart = await prisma.dietChart.create({
            data: json
        })

        return NextResponse.json(dietChart);

    } catch(err) {
        return new NextResponse(
            JSON.stringify({ error: err+'Internal Server Error' }),
            { status: 500 }
        )
    }
}