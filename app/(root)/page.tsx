import { Filters, Title, TopBar } from "@/shared/components/shared";
import { Container } from "@/shared/components/shared/container";
import { ProductGroupList } from "@/shared/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";
import { useSet } from "react-use";
import React from "react";
import { ProductList } from "@/shared/components/shared/product-list";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      vehicles: true,
    }
  });

  return (
    <>

      <Container className="mt-10">
        <Title text="Все машины" size="lg" className="font-extrabold" />

      </Container>
      <TopBar categories={categories.filter((category) => category.vehicles.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}

          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <ProductList categories={categories} />


        </div>
      </Container>
    </>
  );
}
