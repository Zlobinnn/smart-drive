'use client';

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui";
import { ArrowRight, Car, Heart, Loader } from "lucide-react";
import { FavouriteDrawer } from "./favourite-drawer";
import { useFavouriteStore } from "@/shared/store/favourite";


interface Props {
    className?: string;
}

export const FavouriteButton: React.FC<Props> = ({ className }) => {
    const {fetchFavouriteCars, favouriteCars, loading, toggleFavouriteCars} = useFavouriteStore();
    
    return (
        <FavouriteDrawer>
            <Button className="group relative">
                <b><Heart size={20} /></b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
                {loading ? (
                    <Loader size={18} className="animate-spin" />
                ) : (
                    <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                        <Car size={16} className="relative" strokeWidth={2} />
                        <b>{favouriteCars.length}</b>
                    </div>
                )}
                <ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </FavouriteDrawer>
    );
};