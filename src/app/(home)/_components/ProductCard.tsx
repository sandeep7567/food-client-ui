import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropType = { product: Product };

const ProductCard = ({ product }: PropType) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader>
        <Image
          src={product?.image}
          alt="image"
          width={150}
          height={150}
          quality={100}
          className="mx-auto"
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product?.name}</h2>
        <p className="mt-2">{product?.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-4">
        <p className="space-x-2">
          <span>From</span>
          <span className="font-bold">{product?.price}</span>
        </p>
        <Button className="bg-primary/40 hover:bg-primary/30 text-primary font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
