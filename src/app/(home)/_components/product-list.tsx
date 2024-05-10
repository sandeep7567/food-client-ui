import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./product-card";
import { Category, Product } from "@/lib/types";

const ProductList = async ({
  searchParams,
}: {
  searchParams: { resutrantId: string };
}) => {
  const { resutrantId } = searchParams;
  // todo: do concurrent requests with Promise.all()
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories?perPage=100`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch tenants information");
  }

  const categories: Category[] = await categoryResponse.json();

  // todo: add pagination and dynamic tenantId;
  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${resutrantId}`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products information");
  }

  const products: { data: Product[] } = await productResponse.json();

  return (
    <section>
      <div className="container py-12">
        <Tabs defaultValue={categories[0]._id}>
          <TabsList>
            {categories?.map((category) => {
              return (
                <TabsTrigger
                  key={category?._id}
                  value={category._id}
                  className="text-base"
                >
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categories?.map((category) => {
            return (
              <TabsContent value={category._id} key={category._id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {products?.data
                    .filter((product) => product.category._id === category._id)
                    .map((product) => {
                      return (
                        <ProductCard key={product._id} product={product} />
                      );
                    })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
