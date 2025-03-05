import { Brand } from "@prisma/client";
import React from "react";
import { Api } from "@/shared/services/api-client";

export const useBrands = () => {
    const [brands, setBrands] = React.useState<Brand[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchBrands() {
            try {
                setLoading(true);
                const response = await Api.brands.getAll();
                setBrands(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    return {brands, loading};
}