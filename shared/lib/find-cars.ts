import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    transmission?: string;
    priceFrom?: number;
    priceTo?: number;
    selectedBrands?: string;
}

const DEFALT_MIN_PRICE = 50;
const DEFALT_MAX_PRICE = 120;

export const findCars = async (params: GetSearchParams) => {
    const transmission = params.transmission?.split(',').map(String);
    const selectedBrands = params.selectedBrands?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFALT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFALT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            vehicles: {
                where: {
                    brand: selectedBrands ? {
                        id: {
                            in: selectedBrands,
                        },
                    } : undefined,
                    transmission: transmission ? {
                        in: transmission,
                    } : undefined,
                    price: {
                        gte: minPrice,
                        lte: maxPrice,
                    }
                }
            }
        }
    });

    return categories;
}