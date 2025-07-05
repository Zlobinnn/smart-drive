import { Order, OrderStatus, Vehicle } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Title } from "./title";
import { Star } from "lucide-react";

interface Props {
    className?: string;
    data: (Order & { vehicle: Vehicle })[];
}

const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    SUCCEDED: "bg-green-100 text-green-800",
    CANCELED: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Забронирован",
    SUCCEDED: "Завершен",
    CANCELED: "Отменен",
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const OrdersList: React.FC<Props> = ({ className, data }) => {
    if (data.length === 0) {
        return (
            <div className={`${className} text-center py-10`}>
                <p className="text-gray-500">У вас пока нет бронирований</p>
            </div>
        );
    }

    return (
        <div className={`${className} space-y-6 my-10`}>
            <Title text={`История бронирований`} size="md" className="font-bold" />
            {data.map((order) => (
                <div
                    key={order.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow p-6"
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Изображение автомобиля */}
                        <div className="md:w-1/4 flex justify-center">
                            <img
                                src={order.vehicle.imageUrl}
                                alt={order.vehicle.name}
                                className="w-full h-40 object-contain"
                            />
                        </div>

                        {/* Основная информация */}
                        <div className="md:w-2/4 space-y-4">
                            {/* Заголовок с номером заказа и статусом */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold">{order.vehicle.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Номер заказа: #{order.id} | {statusLabels[order.status]}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-500">Дата аренды</p>
                                    <p className="font-medium">
                                        {formatDate(order.startDate)} - {formatDate(order.endDate)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Данные владельца</p>
                                    <p className="font-medium">
                                        ООО "Смарт-Драйв", +7 (123) 456-78-90
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка с ценой и рейтингом */}
                        <div className="md:w-1/4 flex flex-col justify-between items-end">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Стоимость</p>
                                <p className="text-2xl font-bold">${order.totalAmount}</p>
                            </div>

                            <div className="flex items-center space-x-1">
                                {order.status === OrderStatus.SUCCEDED && (
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-5 w-5 ${star <= (5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};