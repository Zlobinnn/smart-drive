'use client';

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Title } from "../title";
import { Vehicle, Service } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductImage } from "../product-image";
import { Button } from "@/shared/components/ui";
import { FilterCheckbox } from "../filter-checkbox";
import { CheckboxFiltersGroup } from "../checkbox-filters-group";
import { useSet } from "react-use";
import { CircleDotDashed, Heart } from "lucide-react";
import { useFavouriteStore } from "@/shared/store/favourite";
import { Calendar, Settings, Droplet, Cpu, Zap, User, MapPin } from "lucide-react";
import { useOrderStore } from "@/shared/store/useOrderStore";

interface Props {
    product: Vehicle;
    className?: string;
    services?: Service[];
}

export const ChooseProductModal: React.FC<Props> = ({ product, className, services }) => {
    const router = useRouter();

    const [selectedServices, { toggle: setSelectedServices }] = useSet(new Set<number>([]));
    const { fetchFavouriteCars, favouriteCars, loading, toggleFavouriteCars } = useFavouriteStore();

    useEffect(() => {
        console.log(selectedServices);
    }, [selectedServices]);

    const { setOrder } = useOrderStore();

    const handleBooking = () => {
        const selectedServicesArray = services!.filter((service) => selectedServices.has(service.id));
    
        setOrder({
            car: {
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
            },
            services: selectedServicesArray,
            totalPrice: product.price + totalServicesPrice,
        });
    
        router.push("/checkout");
    };

    const totalServicesPrice = services!.reduce((acc, service) => acc + (selectedServices.has(service.id) ? service.price : 0), 0);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>

                <div className="flex flex-1">
                    <ProductImage src={product.imageUrl} />

                    <div className="w-[490px] p-7">

                        <DialogTitle>
                            {/* <Title text={product.name} /> */}
                            {product.name}
                        </DialogTitle>

                        <p className="text-gray-400 mt-2">{product.description}</p>

                        <div className="mt-3 grid grid-cols-7 gap-4 text-xs text-gray-500">
                            <div className="flex flex-col items-center gap-1" title="Год выпуска">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <span className="font-medium">{product.year}</span>
                            </div>

                            <div className="flex flex-col items-center gap-1" title="Коробка передач">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Settings size={20} />
                                </div>
                                <span className="font-medium">{product.transmission}</span>
                            </div>

                            <div className="flex flex-col items-center gap-1" title="Тип топлива">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Droplet size={20} />
                                </div>
                                <span className="font-medium">{product.fuelType}</span>
                            </div>

                            {product.engineSize != 0 && (<div className="flex flex-col items-center gap-1" title="Объем двигателя">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Cpu size={20} />
                                </div>
                                <span className="font-medium">{product.engineSize} л</span>
                            </div>)}

                            <div className="flex flex-col items-center gap-1" title="Мощность двигателя">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Zap size={20} />
                                </div>
                                <span className="font-medium">{product.horsepower} л.с.</span>
                            </div>

                            <div className="flex flex-col items-center gap-1" title="Количество мест">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <User size={20} />
                                </div>
                                <span className="font-medium">{product.seats}</span>
                            </div>

                            <div className="flex flex-col items-center gap-1" title="Привод">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <CircleDotDashed size={20} />
                                </div>
                                <span className="font-medium">{product.driveType}</span>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                            <p>Может пригодиться:</p>
                            {services?.map((service) => (
                                <div key={service.id} className="flex justify-between items-center">
                                    <FilterCheckbox
                                        text={service.name}
                                        value={String(service.id)}
                                        checked={selectedServices.has(service.id)}
                                        onCheckedChange={() => setSelectedServices(service.id)}
                                    />
                                    <span className="text-gray-500">${service.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-10">
                            <Button variant={"secondary"}
                                // onClick={() => setIsFavorite(!isFavorite)}
                                onClick={() => toggleFavouriteCars(product.id)}
                                // className="w-[55px] h-[55px] flex items-center justify-center border border-gray-300 rounded-[18px] bg-transparent hover:bg-gray-100 transition"
                                className="w-[55px] h-[55px]"
                            >
                                <Heart size={20} className={(favouriteCars.some(car => car.id === product.id)) ? "fill-red-500 text-red-500" : ""} />
                            </Button>

                            <Button className="h-[55px] px-10 text-base rounded-[18px] flex-1" onClick={handleBooking}>
                                Арендовать за ${product.price + totalServicesPrice}
                            </Button>
                        </div>

                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};