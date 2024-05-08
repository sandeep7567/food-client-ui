"use client";

import { Button } from "@/components/ui/button";
import { Topping } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};

const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: PropType) => {
  const isCurrentSelected = selectedToppings.some(
    (selectTopping: Topping) => selectTopping._id === topping._id
  );

  return (
    <Button
      variant={"outline"}
      className={cn(
        "relative flex flex-col gap-4 h-44",
        isCurrentSelected ? "border-primary" : ""
      )}
      onClick={() => handleCheckBoxCheck(topping)}
    >
      <Image src={topping.image} alt={topping.name} height={80} width={80} />
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
