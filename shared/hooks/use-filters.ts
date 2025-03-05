import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    transmission: string;
    selectedBrands: string;
}

export interface Filters {
    prices: PriceProps;
    transmission: Set<string>;
    selectedBrands: Set<string>;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setTransmision: (value: string) => void;
    setSelectedBrands: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    
    const [selectedBrands, { toggle: toggleBrands }] = useSet(new Set<string>(
        searchParams.get("selectedBrands")?.split(","),
    ));

    const [transmission, { toggle: toggleTransmission }] = useSet(new Set<string>(
        searchParams.get("transmission")?.split(",") || []
    ));

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        selectedBrands,
        transmission,
        prices,
        setPrices: updatePrice,
        setTransmision: toggleTransmission,
        setSelectedBrands: toggleBrands
    }
}