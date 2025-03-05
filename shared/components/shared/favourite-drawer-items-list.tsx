"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDebounce, useSet } from "react-use";
import { Button, Skeleton } from "../ui";
import { Vehicle } from "@prisma/client";
import { useProducts } from "@/shared/hooks/use-products";

interface Props {
    className?: string;
    favouriteProducts: Vehicle[];
    loading: boolean;
    toggleFavouriteCars: (id: number) => void;
}

export const FavouriteDrawerItemsList: React.FC<Props> = ({ className, favouriteProducts, loading, toggleFavouriteCars }) => {
    // const [favouriteCars, { toggle: setFavouriteCars }] = useSet(new Set<number>([]));
    // const { products, loading } = useProducts();

    // React.useEffect(() => {
    //     const savedFavourites = localStorage.getItem("favouriteCars");
    //     if (savedFavourites) {
    //         const parsedFavourites = new Set<number>(JSON.parse(savedFavourites));
    //         parsedFavourites.forEach((id) => favouriteCars.add(id));
    //     }
    // }, []);

    // React.useEffect(() => {
    //     localStorage.setItem("favouriteCars", JSON.stringify(Array.from(favouriteCars)));
    //   }, [favouriteCars]);

    // const favouriteProducts = products.filter(product => favouriteCars.has(product.id));
    
    // React.useEffect(() => {
    //     setProductsLength(favouriteProducts.length);
    // }, [favouriteProducts.length]);

    if (loading) {
        return <div className={className}>

          {...Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
            ))}
    
        </div>;
      };

    return (
        <div>
            {favouriteProducts.map(product => (
                <div className="flex items-center px-2 gap-3 hover:bg-primary/10" key={product.id}>
                    <Link

                        key={product.id}
                        className="flex items-center gap-3 w-full py-2"
                        href={`/product/${product.id}`}>
                        <div className="w-20 flex justify-center">
                            <img
                                src={product.imageUrl}
                                className="rounded-sm h-10 w-20 object-contain"
                                alt={product.name}
                            />
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span>{product.name}</span>

                        </div>

                    </Link>
                    <span>
                        <Button variant="ghost" className="cursor-pointer hover:text-primary hover:bg-0">
                            <X size={20} onClick={() => toggleFavouriteCars(product.id)} />
                        </Button>
                    </span>
                </div>
            ))
            }
        </div>
    );
};