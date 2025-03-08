import { z } from "zod";

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { message: "Имя должно содержать не менее 2-х символов"}).max(20, { message: "Имя должно содержать не более 20-и символов"}),
    lastName: z.string().min(2, { message: "Имя должно содержать не менее 2-х символов"}).max(20, { message: "Имя должно содержать не более 20-и символов"}),
    email: z.string().email({ message: "Некорректный email" }),
    phone: z.string().min(10, { message: "Некорректный номер телефона" }),
    age: z.string().min(2, { message: "Некорректный возраст" }).max(2, { message: "Некорректный возраст" }),
    driverLicense: z.string().min(2, { message: "Некорректное удостоверение" }).max(20, { message: "Некорректное удостоверение" }),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;