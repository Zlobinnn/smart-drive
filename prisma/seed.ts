import { categories, vehicles, services, brands } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
    await prisma.user.createMany({
        data: [{
            fullName: 'John Doe',
            email: 'lVYQ4@example.com',
            password: hashSync('111111', 10),
            verified: new Date(),
            role: 'USER',
        }, {
            fullName: 'Admin',
            email: 'admin@example.com',
            password: hashSync('111111', 10),
            verified: new Date(),
            role: 'ADMIN',
        }]
    })

    await prisma.brand.createMany({
        data: brands,
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.service.createMany({
        data: services,
    });

    await prisma.vehicle.createMany({
        data: vehicles,
    });

    // await prisma.cart.createMany({
    //     data: [{
    //         userId: 1,
    //         totalAmount: 0,
    //         token: '123',
    //     },
    //     {
    //         userId: 2,
    //         totalAmount: 0,
    //         token: '123412',
    //     }
    // ],
    // });

    // await prisma.cartItem.create({
    //     data: {
    //         vehicleId: 1,
    //         cartId: 1,
    //         quantity: 2,
    //         services: {
    //             connect: [{id: 1}, {id: 2}, {id: 3}],
    //         }
    //     }
    // });
}

async function down() {
    await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "Service" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "Vehicle" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE;`;
}



async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })