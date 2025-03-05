import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // const token = req.cookies.get('cartToken')?.value;
        const token = '123';

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