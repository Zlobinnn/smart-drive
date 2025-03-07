"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useQueryFilters, useBrands, useFilters } from "@/shared/hooks";

interface Props {
    className?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
    const { brands, loading } = useBrands();
    const filters = useFilters();

    useQueryFilters(filters);

    const brandsList = brands.map((brand) => ({ text: brand.name, value: String(brand.id) }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0]);
        filters.setPrices("priceTo", prices[1]);
    }

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            {/* Верхние чекбоксы */}

            <CheckboxFiltersGroup
                name="transmission"
                title="Тип трансмиссии"
                className="mt-5"
                limit={2}
                items={[{ text: "Механика", value: "Механика" }, { text: "Автомат", value: "Автомат" }]}
                loading={loading}
                onClickCheckbox={filters.setTransmision}
                selected={filters.transmission}
            />

            {/* Цена */}

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="50" min={50} max={120} value={String(filters.prices.priceFrom)} onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))} />
                    <Input type="number" min={60} max={120} placeholder="120" value={String(filters.prices.priceTo)} onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))} />
                </div>

                <RangeSlider min={50} max={120} step={5} value={[filters.prices.priceFrom || 50, filters.prices.priceTo || 120]}
                    onValueChange={updatePrices}
                />
            </div>

            {/*  */}
            <CheckboxFiltersGroup
                name="brand"
                title="Марка"
                className="mt-5"
                limit={3}
                defaultItems={brandsList.slice(0, 3)}
                items={brandsList}
                loading={loading}
                onClickCheckbox={filters.setSelectedBrands}
                selected={filters.selectedBrands}
            />
        </div>
    );
};