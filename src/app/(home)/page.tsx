import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { Product } from "./_components/product-card";

const products: Product[] = [
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

export default function Home() {
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
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger className="text-base" value="pizza">
                Pizza
              </TabsTrigger>
              <TabsTrigger className="text-base" value="beverages">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {products?.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="beverages">Beverages list.</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
