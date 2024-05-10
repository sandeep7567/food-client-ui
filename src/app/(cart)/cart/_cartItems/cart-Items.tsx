"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CartItem from "./cart-Item";

const CartItems = () => {
  const searchParams = useSearchParams();

  const [isClient, setIsClient] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalAmount = useMemo(() => {
    const totalProduct = cartItems
      .map((item) => {
        const toppingsTotal = item.choosenConfiguration.selectedToppings.reduce(
          (acc, item) => {
            return acc + item.price;
          },
          0
        );

        const configPricing = Object.entries(item.priceConfiguration).reduce(
          (acc, [key, { availableOptions }]) => {
            const price =
              availableOptions[
                item.choosenConfiguration.priceConfiguration[key]
              ];

            return acc + (price ? price : 0);
          },
          0
        );

        const totalPrice = (configPricing + toppingsTotal) * item.qty;

        return totalPrice;
      })
      .reduce((acc, item) => acc + item, 0);

    return totalProduct;
  }, [cartItems]);

  if (!isClient) {
    return null;
  }

  if (!cartItems.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          Your cart is empty!{" "}
          <Link
            className="text-orange-500"
            href={`/?restaurantId=${searchParams.get("restaurantId")}`}
          >
            continue shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem._id} item={cartItem} />;
      })}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">&#8377;{totalAmount}</span>
        <Button>
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
