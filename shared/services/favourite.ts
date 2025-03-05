import { Cart, CartItem, Service, Vehicle } from "@prisma/client";
import { axiosInstance } from "./instance";

export const fetchFavouriteCars = async (): Promise<Cart & { items: (CartItem & { vehicle: Vehicle; services: Service[] })[]}> => {
    const { data } = await axiosInstance.get<Cart & { items: (CartItem & { vehicle: Vehicle; services: Service[] })[]}>('/cart');

    return data;
}