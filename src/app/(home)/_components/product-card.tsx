import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import ProductModal from "@/components/modal/product-modal";
import { Product } from "@/lib/types";
import Image from "next/image";
import { useMemo } from "react";
import { getFromPrice } from "@/lib/utils";

type PropType = { product: Product };

const ProductCard = ({ product }: PropType) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader>
        <Image
          src={product.image!}
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
          <span className="font-bold">Rs. {getFromPrice(product)}</span>
        </p>

        <ProductModal product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
