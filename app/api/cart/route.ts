import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        let userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    { token, },
                ]
            },
            include: {
                items: {
                },
            }
        });

        if (!userCart) {
            userCart = await prisma.cart.create({
                data: {
                    token,
                },
                include: { items: true }
            });
        }

        const response = NextResponse.json(userCart);

        if (!req.cookies.get('cartToken')) {
            response.cookies.set('cartToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return response;

        // TODO
        return NextResponse.json(userCart);
        return NextResponse.json({ items: [] });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await prisma.cart.create({
            data: {
                token,
            }
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log(error);
    }
}