import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
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