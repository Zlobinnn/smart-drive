'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/schemas/checkout-form-scemas";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        console.log(data);
        const cookiesList = cookies();
        const token = (await cookiesList).get('cartToken')?.value;
        if (!token) {
            throw new Error('Token not found');
        }

        //TODO: дофиксить, убрать адрес, комменты и прочее
        const order = await prisma.order.create({
            data: {
                token,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                totalAmount: 100,
                status: OrderStatus.PENDING,
                items: [],
                address: '',
                comment: '',
                userId: 1,
            }
        });

        // TODO: сделать создание смарт-контракта для оплаты
        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: 'Оплата заказа №' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: { id: order.id },
            data: {
                paymentId: paymentData.id
            }
        });

        return '';

    } catch (error) {

    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        await prisma.user.update({
            where: { id: Number(currentUser.id) },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });

    } catch (error) {
        console.log('Error [UPDATE_USER_INFO]', error);
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });

        if (user) {
            // if (!user.verified) {
            //     throw new Error('Почта не подтверждена');
            // }

            throw new Error('Пользователь с такой почтой уже существует');
        }

        const createUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password as string, 10),
                
            }
        });

    } catch (error) {
        console.log('Error [CREATE_USER]', error);
        throw error;
    }
}