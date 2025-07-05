import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || '';

    const products = await prisma.order.findMany({
        where: {
            vehicleId: Number(query),
          },
          select: {
            startDate: true,
            endDate: true,
          },
    });

    return NextResponse.json(products);
}