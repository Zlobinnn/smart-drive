import { Service } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constans";

export const getAll = async (): Promise<Service[]> => {
    return (await axiosInstance.get<Service[]>('/services'))
    .data;
};