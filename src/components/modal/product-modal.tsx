"use client";

import Image from "next/image";
import { Product, Topping } from "@/lib/types";
import ToppingList from "@/app/(home)/_components/topping-list";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { startTransition, Suspense, useMemo, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cart-slice";

type ChoosenConfig = {
  [key: string]: string;
};

const ProductModal = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();

  const defaultConfig: ChoosenConfig = Object.entries(
    product.category.priceConfiguration
  )
    .map(([key, value]) => {
      return { [key]: value.availableOptions[0] };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

  const [choosenConfig, setChoosenConfig] =
    useState<ChoosenConfig>(defaultConfig);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const totalPrice = useMemo(() => {
    const toppingsTotal = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const configPricing = Object.entries(choosenConfig).reduce(
      (acc, [key, value]: [string, string]) => {
        const price = product.priceConfiguration[key].availableOptions[value];

        return acc + price;
      },
      0
    );

    return configPricing + toppingsTotal;
  }, [choosenConfig, selectedToppings, product.priceConfiguration]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExist = selectedToppings.some(
      (selectTopping) => selectTopping._id === topping._id
    );

    startTransition(() => {
      if (isAlreadyExist) {
        setSelectedToppings((prev: Topping[]) =>
          prev.filter((selectTopping) => selectTopping._id !== topping._id)
        );
        return;
      }

      setSelectedToppings((prev: Topping[]) => [...prev, topping]);
    });
  };

  const handleAddToCart = (product: Product) => {
    const itemToAdd = {
      product,
      choosenConfiguration: {
        priceConfiguration: choosenConfig,
        selectedToppings,
      },
    };

    dispatch(addToCart(itemToAdd));
  };

  const handleRadioChnage = (key: string, data: string) => {
    startTransition(() => {
      setChoosenConfig((prev) => {
        return {
          ...prev,
          [key]: data,
        };
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-primary/40 hover:bg-primary/30 text-primary font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <div className="flex">
          <div className="w-1/3 bg-white rounded p-8 flex justify-center items-center">
            <Image
              src={product.image}
              width={450}
              height={450}
              alt={product?.name}
            />
          </div>
          <div className="w-2/3 p-8">
            <h3 className="text-xl font-bold ">{product?.name}</h3>
            <p className="mt-1">{product?.description}</p>

            {Object.entries(product?.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h4 className="mt-6">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      className="grid grid-cols-3 gap-4 mt-2"
                      onValueChange={(data) => {
                        handleRadioChnage(key, data);
                      }}
                    >
                      {value.availableOptions.map((option) => {
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                );
              }
            )}

            {/* todo: make dynamic condition render ( Backend ) add isTopping: boolean to category modal in backend  */}
            {product.category.name === "Pizza" && (
              <Suspense
                fallback={
                  <div className="w-20 h-20 border-t-2 border-l-2 border-primary animate-spin rounded-full my-4 mx-auto" />
                }
              >
                <ToppingList
                  selectedToppings={selectedToppings}
                  handleCheckBoxCheck={handleCheckBoxCheck}
                />
              </Suspense>
            )}

            <div className="flex justify-between items-center mt-12">
              <span className="font-bold">Rs.{totalPrice}</span>
              <Button onClick={() => handleAddToCart(product)}>
                <ShoppingCart size={20} />
                <span className="ml-2">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
