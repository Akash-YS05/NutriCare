import { PrismaClient, Role } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";

export async function POST(
    req: NextRequest,
) {
    if (req.method !== "POST") {
        return NextResponse.json({ error: `Method ${req.method} not allowed` });
    }

    const { email, password, name, contactInfo, role } = await req.json();

    if (!email || !password || !contactInfo || !role) {
    return NextResponse.json({ error: 'Email, password, contact info, and role are required' });
  }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" });
        }

        if (!Object.values(Role).includes(role)) {
            return NextResponse.json({ error: 'Invalid role specified' });
          }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name: name || null,
                password: hashedPassword,
                role,
                contactInfo,
            }
        })

        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
        }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            token,
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
              contactInfo: newUser.contactInfo,
            },
          });


    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' });        
    }
}
