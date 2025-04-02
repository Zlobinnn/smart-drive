'use client';
import { useCategoryStore } from "@/shared/store/category";
import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
    items: Category[];
    className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    const { sortType } = useCategoryStore();

    const handleScroll = (name: string) => {
        const target = document.getElementById(name);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl select-none',
                sortType !== 'По категориям' && 'pointer-events-none opacity-50',
                className
            )}
        >
            {items.map(({ name, id }) => (
                <button
                    key={id}
                    onClick={() => handleScroll(name)}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};
