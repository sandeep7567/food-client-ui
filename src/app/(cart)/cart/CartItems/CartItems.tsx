"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

const CartItems = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col gap-8">
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem._id} item={cartItem} />;
      })}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">&#8377;{4000}</span>
        <Button>
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
