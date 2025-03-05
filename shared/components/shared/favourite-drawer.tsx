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
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { useSet } from "react-use";
import { FavouriteDrawerItemsList } from "./favourite-drawer-items-list";
import { useProducts } from "@/shared/hooks/use-products";
import { Api } from "@/shared/services/api-client";
import { Vehicle } from "@prisma/client";

interface Props {
    className?: string;
}

export const FavouriteDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const [productsLength, setProductsLength] = React.useState(0);

    const getCarWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) return "автомобиль";
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "автомобиля";
        return "автомобилей";
    };

    return (
        <Sheet onOpenChange={(open) => !open && window.location.reload()}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col pb-0 bg-white">
                <SheetHeader>
                    <SheetTitle>
                        В избранном <span className="font-bold">{productsLength} {getCarWord(productsLength)}</span>
                    </SheetTitle>
                </SheetHeader>

                <FavouriteDrawerItemsList setProductsLength={setProductsLength} />
            </SheetContent>
        </Sheet>
    );
};