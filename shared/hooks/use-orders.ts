import { Brand, Order, Vehicle } from "@prisma/client";
import React, { useState } from "react";
import { Api } from "@/shared/services/api-client";
import { prisma } from "@/prisma/prisma-client";

export const useOrders = (product: Vehicle) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchOrders() {
            try {
                setLoading(true);
                const response = await Api.orders.getByProduct(product.id.toString());
                setOrders(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    return { orders, loading };
}