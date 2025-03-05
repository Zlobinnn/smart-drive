import { Brand, Vehicle } from "@prisma/client";
import React from "react";
import { Api } from "@/shared/services/api-client";

export const useProducts = () => {
    const [products, setProducts] = React.useState<Vehicle[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchBrands() {
            try {
                setLoading(true);
                const response = await Api.products.search();
                setProducts(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    return {products, loading};
}