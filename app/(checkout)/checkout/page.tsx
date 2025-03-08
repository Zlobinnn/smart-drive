"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { Container, Title } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form/form-input";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button, Input } from "@/shared/components/ui";
import { useOrderStore } from "@/shared/store/useOrderStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/schemas/checkout-form-scemas";

export default function Checkout() {
    const { order } = useOrderStore();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            age: "",
        }
    });

    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log(data);
    };

    return (
        <Container className="mt-6">
            <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <WhiteBlock title="1. Информация о заказе">
                                {order ? (
                                    <div className="flex gap-4">
                                        <img src={order.car.imageUrl} alt={order.car.name} className="w-24 h-16 object-cover rounded-lg" />
                                        <div>
                                            <p className="font-bold text-lg">{order.car.name}</p>
                                            <p className="text-gray-500">Стоимость: ${order.car.price}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Вы не выбрали машину</p>
                                )}
                            </WhiteBlock>

                            <WhiteBlock title="2. Персональные данные">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput name="firstName" className="text-base" placeholder="Имя" />
                                    <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
                                    <FormInput name="email" className="text-base" placeholder="Email" />
                                    <FormInput name="phone" className="text-base" placeholder="Телефон" />
                                    <FormInput name="age" className="text-base" placeholder="Возраст водителя" />
                                    <FormInput name="driverLicense" className="text-base" placeholder="Водительское удостоверение" />
                                </div>
                            </WhiteBlock>
                        </div>

                        <div className="w-[450px]">
                            <WhiteBlock className="p-6 sticky top-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl">Итого:</span>
                                    <span className="text-[28px] font-extrabold">${order ? order.totalPrice : 0}</span>
                                </div>

                                <div className="flex my-4">
                                    <span className="flex flex-1 text-lg text-neutral-500">
                                        Стоимость автомобиля:
                                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                    </span>
                                    <span className="font-bold text-lg">${order ? order.car.price : 0}</span>
                                </div>

                                <div className="flex my-4">
                                    <span className="flex flex-1 text-lg text-neutral-500">
                                        Стоимость услуг:
                                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                    </span>
                                    <span className="font-bold text-lg">${order?.services.reduce((acc, service) => acc + service.price, 0)}</span>
                                </div>

                                <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">Перейти к оплате</Button>
                            </WhiteBlock>
                        </div>
                    </div>
                </form>
            </FormProvider>


        </Container>
    );
}