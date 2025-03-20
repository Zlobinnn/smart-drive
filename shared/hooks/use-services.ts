import { Service } from "@prisma/client";
import React from "react";
import { Api } from "@/shared/services/api-client";

export const useServices = () => {
    const [services, setServices] = React.useState<Service[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                const response = await Api.services.getAll();
                setServices(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    return {services, loading};
}