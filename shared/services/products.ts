import { Vehicle } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constans";

export const search = async (query?: string): Promise<Vehicle[]> => {
    if (!query) return (await axiosInstance.get<Vehicle[]>(ApiRoutes.PRODUCTS))
        .data;
    return (await axiosInstance.get<Vehicle[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } }))
        .data;
};