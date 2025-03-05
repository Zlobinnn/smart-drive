import { Cart, CartItem, Service, Vehicle } from "@prisma/client";
import { axiosInstance } from "./instance";

export const fetchFavouriteCars = async (): Promise<Cart & { items: Vehicle[]}> => {
    const { data } = await axiosInstance.get<Cart & { items: Vehicle[] }>('/cart');

    return data;
}

export const toggleFavouriteCars = async (id: number): Promise<Cart & { items: Vehicle[]}> => {
    const { data } = await axiosInstance.patch<Cart & { items: Vehicle[] }>('/cart/' + id);

    return data;
}