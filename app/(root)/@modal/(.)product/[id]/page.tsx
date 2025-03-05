import { ChooseProductModal } from "@/shared/components/shared/modals";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const product = await prisma.vehicle.findFirst({
        where: { id: Number(id) },
    });

    const services = await prisma.service.findMany({});

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} services={services}></ChooseProductModal>
}