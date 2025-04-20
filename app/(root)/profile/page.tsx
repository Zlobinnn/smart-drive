import { prisma } from "@/prisma/prisma-client";
import { Container } from "@/shared/components/shared";
import { OrdersList } from "@/shared/components/shared/orders-list";
import { ProfileForm } from "@/shared/components/shared/profile-form";
import { getUserSession } from "@/shared/lib/get-user-session";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect('/');
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id)
        }
    });

    if (!user) {
        return redirect('/');
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id
        }, include: {
            vehicle: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <Container>
        <div className="flex gap-24">
            <div>
                <ProfileForm data={user} />
            </div>
            <div>

                <OrdersList data={orders} />
            </div>
        </div>
    </Container>
}