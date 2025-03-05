import { Container, ProductImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const product = await prisma.vehicle.findFirst({ where: { id: Number(id) } });

    if (!product) {
        return notFound();
    }

    return <Container className="flex flex-col my-10">
        <div className="flex flex-1">
            <ProductImage src={product.imageUrl} className="" />

            <div className="w-[490px] p-7">
                <Title text={product.name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{product.description}</p>
            </div>

        </div>
    </Container>
}