"use client";
import { Category, Vehicle } from "@prisma/client";
import React from "react";
import { ProductGroupList } from "./products-group-list";
import { useSet } from "react-use";

interface Props {
  className?: string;
  categories: (Category & { vehicles: Vehicle[] })[];
}

export const ProductList: React.FC<Props> = ({ className, categories }) => {
  const [favouriteCars, { toggle: setFavouriteCars }] = useSet(new Set<number>([]));

  React.useEffect(() => {
    console.log(favouriteCars);
  }, [favouriteCars]);

  React.useEffect(() => {
    const savedFavourites = localStorage.getItem("favouriteCars");
    if (savedFavourites) {
      const parsedFavourites = new Set<number>(JSON.parse(savedFavourites));
      parsedFavourites.forEach((id) => favouriteCars.add(id));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("favouriteCars", JSON.stringify(Array.from(favouriteCars)));
  }, [favouriteCars]);


  return (
    <div className="flex-1">
      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          category.vehicles.length > 0 && (
            <ProductGroupList
              key={category.id}
              title={category.name}
              categoryId={category.id}
              items={category.vehicles}
              favouriteCars={favouriteCars}
              setFavouriteCars={setFavouriteCars}
            />
          )
        ))}


      </div>
    </div>
  );
};