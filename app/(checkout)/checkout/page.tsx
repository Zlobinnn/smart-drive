"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { Container, FilterCheckbox, Title } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form/form-input";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button, Input } from "@/shared/components/ui";
import { useOrderStore } from "@/shared/store/useOrderStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/schemas/checkout-form-scemas";
import { createOrder } from "@/app/actions";
import { toast } from "sonner";
import React from "react";
import { set } from "zod";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import { useServices } from "@/shared/hooks/use-services";
import { useSet } from "react-use";

export default function Checkout() {
    const [submitting, setSubmitting] = React.useState(false);
    const { order } = useOrderStore();
    const { data: session } = useSession();
    const [selectedServices, { toggle: setSelectedServices }] = useSet(new Set<number>([]));
    const {services, loading} = useServices();

    const selectedServicesArray = services!.filter((service) => selectedServices.has(service.id));
    const totalServicesPrice = services!.reduce((acc, service) => acc + (selectedServices.has(service.id) ? service.price : 0), 0);


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

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(" ");
            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session]);

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);

            toast.error("Заказ успешно создан", { icon: "✅" });

            if (url) {
                location.href = url;
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            toast.error("Что-то пошло не так", { icon: "🚨" });
        } finally {
            // setSubmitting(false);
        }
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

                            <WhiteBlock title="3. Дополнительные услуги">
                                {services?.map((service) => (
                                    <div key={service.id} className="flex justify-between items-center mb-2">
                                        <FilterCheckbox
                                            text={service.name}
                                            value={String(service.id)}
                                            checked={selectedServices.has(service.id)}
                                            onCheckedChange={() => setSelectedServices(service.id)}
                                        />
                                        <span className="text-gray-500">${service.price}</span>
                                    </div>
                                ))}
                            </WhiteBlock>
                        </div>

                        <div className="w-[450px]">
                            <WhiteBlock className="p-6 sticky top-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl">Итого:</span>
                                    <span className="text-[28px] font-extrabold">${order ? order.car.price + totalServicesPrice : 0}</span>
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
                                    <span className="font-bold text-lg">${totalServicesPrice}</span>
                                </div>

                                <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold" loading={submitting}>Перейти к оплате</Button>
                            </WhiteBlock>
                        </div>
                    </div>
                </form>
            </FormProvider>


        </Container>
    );
}