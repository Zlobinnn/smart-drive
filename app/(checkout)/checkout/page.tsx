import { Container, Title } from "@/shared/components/shared";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { Button, Input } from "@/shared/components/ui";

export default function Checkout() {
    return (
        <Container className="mt-6">
            <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Информация о заказе">
                        Тачка
                    </WhiteBlock>

                    <WhiteBlock title="2. Персональные данные">
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="firstName" className="text-base" placeholder="Имя" />
                            <Input name="lastName" className="text-base" placeholder="Фамилия" />
                            <Input name="email" className="text-base" placeholder="Email" />
                            <Input name="phone" className="text-base" placeholder="Телефон" />
                            <Input name="age" className="text-base" placeholder="Возраст водителя" />
                            <Input name="driverLicense" className="text-base" placeholder="Водительское удостоверение" />
                        </div>
                    </WhiteBlock>
                </div>

                <div className="w-[450px]">
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            <span className="text-[28px] font-extrabold">$600</span>
                        </div>

                        <div className="flex my-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Стоимость автомобиля:
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </span>
                            <span className="font-bold text-lg">$500</span>
                        </div>

                        <div className="flex my-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Стоимость услуг:
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                            </span>
                            <span className="font-bold text-lg">$100</span>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">Перейти к оплате</Button>
                    </WhiteBlock>
                </div>
            </div>


        </Container>
    );
}