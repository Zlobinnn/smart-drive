'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { CircleDot, CircleDotDashed, Gauge, Heart, Plus } from "lucide-react";
import { useSet } from "react-use";
import { FilterCheckbox } from "./filter-checkbox";
import { Calendar, Settings, Droplet, Cpu, Zap, User, MapPin } from "lucide-react";

interface Props {
    id: number;
    name: string;
    price: number;
    count?: number;
    imageUrl: string;
    className?: string;
    discription?: string;
    isFavourite?: boolean;
    setFavouriteCars: (id: number) => void;

    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    engineSize: number;
    horsepower: number;
    seats: number;
    doors: number;
    driveType: string;
    color: string;
}

export const ProductCard: React.FC<Props> = ({
    name,
    price,
    count,
    imageUrl,
    className,
    discription,
    id,
    isFavourite,
    setFavouriteCars,
    year,
    mileage,
    transmission,
    fuelType,
    engineSize,
    horsepower,
    seats,
    doors,
    driveType,
    color }) => {
    
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 rounded-lg h-[260px]">
                    <img className="h-[215px] w-auto object-contain" src={imageUrl} alt={name} />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
                <p className="text-sm text-gray-400">
                    {/* {discription} */}
                </p>

            </Link>
            <div className="mt-3 grid grid-cols-7 gap-4 text-xs text-gray-500">
                <div className="flex flex-col items-center gap-1" title="Год выпуска">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <Calendar size={20} />
                    </div>
                    <span className="font-medium">{year}</span>
                </div>

                <div className="flex flex-col items-center gap-1" title="Коробка передач">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <Settings size={20} />
                    </div>
                    <span className="font-medium">{transmission}</span>
                </div>

                <div className="flex flex-col items-center gap-1" title="Тип топлива">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <Droplet size={20} />
                    </div>
                    <span className="font-medium">{fuelType}</span>
                </div>

                {engineSize != 0 && (<div className="flex flex-col items-center gap-1" title="Объем двигателя">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <Cpu size={20} />
                    </div>
                    <span className="font-medium">{engineSize} л</span>
                </div>)}

                <div className="flex flex-col items-center gap-1" title="Мощность двигателя">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <Gauge size={20} />
                    </div>
                    <span className="font-medium">{horsepower} л.с.</span>
                </div>

                <div className="flex flex-col items-center gap-1" title="Количество мест">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <User size={20} />
                    </div>
                    <span className="font-medium">{seats}</span>
                </div>

                <div className="flex flex-col items-center gap-1" title="Привод">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <CircleDotDashed size={20} />
                    </div>
                    <span className="font-medium">{driveType}</span>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    от <b>${price}</b>
                </span>

                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setFavouriteCars(id)}>
                        <Heart size={20} className={isFavourite ? "fill-red-500 text-red-500" : ""} />
                    </Button>

                    <Link href={`/product/${id}`}>
                        <Button variant="secondary">
                            <Plus size={20} className="mr-1" />
                            Забронировать
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
};