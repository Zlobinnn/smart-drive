'use client';

import { cn } from "@/shared/lib/utils";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useCategoryStore } from "@/shared/store/category";

interface Props {
    className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
    const [open, setOpen] = useState(false);
    const { sortType, setSortType } = useCategoryStore();

    const options = [
        'По категориям',
        'По возрастанию цены',
        'По убыванию цены',
    ];

    const handleSelect = (option: string) => {
        setSortType(option);
        setOpen(false);
    };

    return (
        <div className="relative select-none">
            <div
                onClick={() => setOpen(!open)}
                className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}
            >
                <ArrowUpDown size={16} />
                <b>Сортировка:</b>
                <b className="text-primary">{sortType}</b>
                <ChevronDown size={16} className={cn('transition', open && 'rotate-180')} />
            </div>

            {open && (
                <div className="absolute top-full mt-2 right-0 w-max bg-white shadow-md rounded-xl p-2 z-10">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
