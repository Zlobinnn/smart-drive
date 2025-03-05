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
import { Heart } from "lucide-react";

interface Props {
    product: Vehicle;
    className?: string;
    services?: Service[];
}

export const ChooseProductModal: React.FC<Props> = ({ product, className, services }) => {
    const router = useRouter();

    const [selectedServices, { toggle: setSelectedServices }] = useSet(new Set<number>([]));
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log(selectedServices);
    }, [selectedServices]);

    useEffect(() => {
        const savedFavourites = localStorage.getItem("favouriteCars");
        if (savedFavourites) {
            const favouriteSet = new Set<number>(JSON.parse(savedFavourites));
            setIsFavorite(favouriteSet.has(product.id));
        }
    }, [product.id]);

    // Обновляем localStorage при добавлении/удалении из избранного
    const handleFavoriteToggle = () => {
        const savedFavourites = localStorage.getItem("favouriteCars");
        const favouriteSet = savedFavourites ? new Set<number>(JSON.parse(savedFavourites)) : new Set<number>();

        if (favouriteSet.has(product.id)) {
            favouriteSet.delete(product.id);
            setIsFavorite(false);
        } else {
            favouriteSet.add(product.id);
            setIsFavorite(true);
        }

        localStorage.setItem("favouriteCars", JSON.stringify(Array.from(favouriteSet)));
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
                                onClick={handleFavoriteToggle}
                                // className="w-[55px] h-[55px] flex items-center justify-center border border-gray-300 rounded-[18px] bg-transparent hover:bg-gray-100 transition"
                                className="w-[55px] h-[55px]"
                            >
                                <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                            </Button>

                            <Button className="h-[55px] px-10 text-base rounded-[18px] flex-1">
                                Арендовать за ${product.price + totalServicesPrice}
                            </Button>
                        </div>

                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};