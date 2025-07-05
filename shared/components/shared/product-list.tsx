"use client";
import { Category, Vehicle } from "@prisma/client";
import React, { useMemo } from "react";
import { ProductGroupList } from "./products-group-list";
import { useFavouriteStore } from "@/shared/store/favourite";
import { useCategoryStore } from "@/shared/store/category";

interface Props {
  className?: string;
  categories: (Category & { vehicles: Vehicle[] })[];
}

export const ProductList: React.FC<Props> = ({ className, categories }) => {
  const { fetchFavouriteCars, favouriteCars, loading, toggleFavouriteCars } = useFavouriteStore();
  const { sortType } = useCategoryStore();

  const sortedCategories = useMemo(() => {
    if (sortType === 'По категориям') return categories;

    const allVehicles: Vehicle[] = categories.flatMap((category) => category.vehicles);

    const sortedVehicles = [...allVehicles].sort((a, b) => {
      if (sortType === 'По возрастанию цены') {
        return a.price - b.price;
      } else if (sortType === 'По убыванию цены') {
        return b.price - a.price;
      }
      return 0;
    });

    return [{
      id: 0,
      name: "Все автомобили",
      vehicles: sortedVehicles
    }];
  }, [categories, sortType]);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-16">
        {sortedCategories.map((category) => (
          category.vehicles.length > 0 && (
            <ProductGroupList
              key={category.id}
              title={category.name}
              categoryId={category.id}
              items={category.vehicles}
              favouriteCars={favouriteCars}
              setFavouriteCars={toggleFavouriteCars}
            />
          )
        ))}
      </div>
    </div>
  );
};
