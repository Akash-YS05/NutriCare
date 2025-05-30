import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(
  req: NextRequest,
) {

  
  if (req.method !== 'POST') {
    return NextResponse.json({ error: `Method ${req.method} not allowed` });
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7D' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
