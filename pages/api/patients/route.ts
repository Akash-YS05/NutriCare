import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            {status: 401}
        )
    }

    try {
        const patients = await prisma.patient.findMany({
            include: {
                dietCharts: true
            }
        })
        return NextResponse.json(patients);
    } catch(err) {
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            {status:500}
        )
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            {status: 401}
        )
    }

    try {
        const json = await req.json();
        const patient = await prisma.patient.create({
            data: json
        })

        return NextResponse.json(patient);
    } catch(err){
        return new NextResponse(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        )
    }
}