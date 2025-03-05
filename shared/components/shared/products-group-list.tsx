'use client';
import React from "react";
import { useIntersection, useSet } from 'react-use';
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/category";
import { Vehicle } from "@prisma/client";

interface Props {
    title: string;
    items: Vehicle[];
    className?: string;
    listClassName?: string;
    categoryId: number;
    favouriteCars: Vehicle[];
    setFavouriteCars: (id: number) => void;
  }
export const ProductGroupList: React.FC<Props> = ({ title, items, className, listClassName, categoryId, favouriteCars, setFavouriteCars}) => {
    const setActiveCategoryId = useCategoryStore((state)=>state.setActiveId);
    const intersectionRef = React.useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.4,
    })

    React.useEffect(() => {
        if(intersection?.isIntersecting){
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, title, intersection?.isIntersecting]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>

            <div className="grid grid-cols-2 gap-[50px]">
                {items.map((product, i) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.price}
                    discription={product.description}
                    isFavourite={favouriteCars.some(car => car.id === product.id)}
                    setFavouriteCars={setFavouriteCars}
                    year={product.year}
                    mileage={product.mileage}
                    transmission={product.transmission}
                    fuelType={product.fuelType}
                    engineSize={product.engineSize}
                    horsepower={product.horsepower}
                    seats={product.seats}
                    doors={product.doors}
                    driveType={product.driveType}
                    color={product.color}
                />
                ))}
            </div>
        </div>
    );
};