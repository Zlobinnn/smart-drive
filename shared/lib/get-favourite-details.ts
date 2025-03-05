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
    services: { id: number; name: string; price: number }[];
};

interface ReturnProps {
    items: FavouriteItem[];
}

export const getFavouriteDetails = (
    data: Cart & { items: (CartItem & { vehicle: Vehicle; services: Service[] })[] }
): ReturnProps => {
    if (!data) return { items: [] };

    return { items: data.items.map((item) => ({
        id: item.vehicle.id,
        name: item.vehicle.name,
        price: item.vehicle.price,
        imageUrl: item.vehicle.imageUrl,
        description: item.vehicle.description,
        year: item.vehicle.year,
        mileage: item.vehicle.mileage,
        transmission: item.vehicle.transmission,
        fuelType: item.vehicle.fuelType,
        engineSize: item.vehicle.engineSize,
        horsepower: item.vehicle.horsepower,
        seats: item.vehicle.seats,
        doors: item.vehicle.doors,
        driveType: item.vehicle.driveType,
        color: item.vehicle.color,
        services: item.services.map((service) => ({
            id: service.id,
            name: service.name,
            price: service.price,
        })),
    })) };
};