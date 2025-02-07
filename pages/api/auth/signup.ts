import { PrismaClient, Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    const { email, password, name, contactInfo, role } = req.body;

    if (!email || !password || !contactInfo || !role) {
    return res.status(400).json({ error: 'Email, password, contactInfo, and role are required' });
  }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        if (!Object.values(Role).includes(role)) {
            return res.status(400).json({ error: 'Invalid role specified' });
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

        return res.status(201).json({
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
        return res.status(500).json({ error: 'Internal Server Error' });        
    }
}
