import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { hashSync } from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

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