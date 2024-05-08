import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./_components/product-card";
import { Category, Product } from "@/lib/types";

const products = [
  {
    _id: "1",
    name: "Product 1",
    description: "Product 1",
    image: "/pizza-main.png",
    price: 500,
  },
  {
    _id: "2",
    name: "Product 1",
    description: "Product 1",
    image: "/pizza-main.png",
    price: 400,
  },
  {
    _id: "3",
    name: "Product 1",
    description: "Product 1",
    image: "/pizza-main.png",
    price: 300,
  },
  {
    _id: "4",
    name: "Product 1",
    description: "Product 1",
    image: "/pizza-main.png",
    price: 200,
  },
  {
    _id: "5",
    name: "Product 1",
    description: "Product 1",
    image: "/pizza-main.png",
    price: 100,
  },
];

export default async function Home() {
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
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=10`,
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
    <>
      {/* Hero Section */}
      <section className="bg-white dark:bg-black ">
        <div className="container flex justify-between items-center py-24">
          <div>
            <h1 className="text-7xl text-black font-sans leading-tight">
              Super Deliciour pizza <br />
              <span className="text-primary">just in 45 minutes</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a free meal if you order online take only 45 minutes.
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-8 font-bold">
              Get your pizza now!
            </Button>
          </div>
          <div>
            <Image
              src={"/pizza-main.png"}
              width={460}
              height={460}
              alt="image"
            />
          </div>
        </div>
      </section>

      {/* Tab Section */}
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
                      .filter((product) => product.categoryId === category._id)
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
    </>
  );
}
