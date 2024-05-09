"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const CartCounter = () => {
  const { value } = useAppSelector((state) => state.cart);
  return (
    <div className="relative">
      <Link href={"/cart"} className="hover:text-primary/90">
        <ShoppingBasket />
      </Link>
      <span className="absolute -top-3.5 -right-3.5 h-4 w-4 flex items-center justify-center rounded-full bg-primary font-bold text-primary-foreground p-2.5">
        {value}
      </span>
    </div>
  );
};

export default CartCounter;
