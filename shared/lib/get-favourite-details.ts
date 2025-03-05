import { Cart, CartItem, Service, Vehicle } from "@prisma/client"

export type FavouriteItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
    discription?: string;
    isFavourite?: boolean;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    engineSize: number;
    horsepower: number;
    seats: number;
    doors: number;
    driveType: string;
    color: string;
};

interface ReturnProps {
    items: FavouriteItem[];
}

export const getFavouriteDetails = (
    data: Cart & { items: Vehicle[]}
): ReturnProps => {
    if (!data) return { items: [] };

    return { items: data.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        year: item.year,
        mileage: item.mileage,
        transmission: item.transmission,
        fuelType: item.fuelType,
        engineSize: item.engineSize,
        horsepower: item.horsepower,
        seats: item.seats,
        doors: item.doors,
        driveType: item.driveType,
        color: item.color,
    })) };
};