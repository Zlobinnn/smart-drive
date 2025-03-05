import { Brand } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constans";

export const getAll = async (): Promise<Brand[]> => {
    return (await axiosInstance.get<Brand[]>(ApiRoutes.BRANDS))
    .data;
};