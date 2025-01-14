import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    debug: true, // nextAuth's debug feature
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("Missing credentials");
                        throw new Error("Missing credentials");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    console.log("User found:", !!user); // for debugging

                    if (!user) {
                        console.log("User not found for email:", credentials.email);
                        throw new Error("Invalid credentials");
                    }

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    console.log("Password validation result:", isValidPassword);

                    if (!isValidPassword) {
                        console.log("Invalid password for user:", credentials.email);
                        throw new Error("Invalid credentials");
                    }

                    const returnUser = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                    console.log("Returning user object:", { ...returnUser, password: "[REDACTED]" });
                    return returnUser;
                } catch (error) {
                    console.error("Auth error:", error);
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET, 
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    callbacks: {
        async session({ session, token }) {
            try {
                if (token && session.user) {
                    session.user.id = token.id as string;
                    session.user.role = token.role as string;
                }
                return session;
            } catch (error) {
                console.error("Session callback error:", error);
                throw error;
            }
        },
        async jwt({ token, user }) {
            try {
                if (user) {
                    token.id = user.id;
                    token.role = user.role;
                }
                return token;
            } catch (error) {
                console.error("JWT callback error:", error);
                throw error;
            }
        },
    },
};
