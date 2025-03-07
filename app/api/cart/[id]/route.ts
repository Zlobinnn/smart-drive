import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const vehicleId = Number(id);
        const token = req.cookies.get('cartToken')?.value;
    
        if (!token) {
            return NextResponse.json({error: 'Token not found'});
        }

        const userCart = await prisma.cart.findFirst({
            where: { token },
            include: { items: true }
        });

        if (!userCart) {
            return NextResponse.json({error: 'Cart not found'});
        }

        const vehicleExists = userCart.items.some(vehicle => vehicle.id === vehicleId);

        if (vehicleExists) {
            await prisma.cart.update({
                where: { id: userCart.id },
                data: {
                    items: {
                        disconnect: { id: vehicleId }
                    }
                }
            });
        } else {
            await prisma.cart.update({
                where: { id: userCart.id },
                data: {
                    items: {
                        connect: { id: vehicleId }
                    }
                }
            });
        }

        const updatedCart = await prisma.cart.findFirst({
            where: { token },
            include: { items: true }
        })
        return NextResponse.json(updatedCart);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Не удалось обновить список избранных товаров'}, {status: 500});
    }
}