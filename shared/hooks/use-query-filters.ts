import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();
    
    React.useEffect(() => {
        const params = {
            ...filters.prices,
            transmission: Array.from(filters.transmission),
            selectedBrands: Array.from(filters.selectedBrands),
        }

        const query = qs.stringify(params, {
            arrayFormat: 'comma',
        });

        router.push(`?${query}`, { scroll: false });
    }, [filters.prices, filters.transmission, filters.selectedBrands]);
}