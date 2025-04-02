import { Order, Vehicle } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constans";

export const getByProduct = async (query?: string): Promise<Order[]> => {
    return (await axiosInstance.get<Order[]>(('/orders'), { params: { query } }))
    .data;
};