"use client";

import React from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowRight, FolderOpen, PackageOpen } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { useSet } from "react-use";
import { FavouriteDrawerItemsList } from "./favourite-drawer-items-list";
import { useProducts } from "@/shared/hooks/use-products";
import { Api } from "@/shared/services/api-client";
import { Vehicle } from "@prisma/client";
import { useFavouriteStore } from "@/shared/store/favourite";

interface Props {
    className?: string;
}

export const FavouriteDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    // const [fetchFavouriteCars, favouriteCars, loading] = useFavouriteStore((state) => [state.fetchFavouriteCars, state.favouriteCars, state.loading]);
    const {fetchFavouriteCars, favouriteCars, loading, toggleFavouriteCars} = useFavouriteStore();

    React.useEffect(() => {
        fetchFavouriteCars();
    }, []);

    const getCarWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) return "автомобиль";
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "автомобиля";
        return "автомобилей";
    };

    return (
        <Sheet onOpenChange={(open) => !open}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col pb-0 bg-white">
                <SheetHeader>
                    <SheetTitle>
                        В избранном <span className="font-bold">{favouriteCars.length} {getCarWord(favouriteCars.length)}</span>
                    </SheetTitle>
                </SheetHeader>

                <FavouriteDrawerItemsList favouriteProducts={favouriteCars} loading={loading} toggleFavouriteCars={toggleFavouriteCars}/>
                {favouriteCars.length === 0 && !loading && <PackageOpen size={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
            </SheetContent>
        </Sheet>
    );
};