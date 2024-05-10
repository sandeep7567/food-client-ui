import { CartItem as CartItemProps } from "@/lib/store/features/cart/cart-slice";
import { X } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import QtyChanger from "./qty-changer";

interface ICartItem {
  item: CartItemProps;
}

const CartItem = ({ item }: ICartItem) => {
  const totalPrice = useMemo(() => {
    const toppingsTotal = item.choosenConfiguration.selectedToppings.reduce(
      (acc, item) => {
        return acc + item.price;
      },
      0
    );

    const configPricing = Object.entries(item.priceConfiguration).reduce(
      (acc, [key, { availableOptions }]) => {
        const price =
          availableOptions[item.choosenConfiguration.priceConfiguration[key]];

        return acc + (price ? price : 0);
      },
      0
    );

    const total = (toppingsTotal + configPricing) * item.qty;

    return total;
  }, [
    item.choosenConfiguration.priceConfiguration,
    item.choosenConfiguration.selectedToppings,
    item.priceConfiguration,
    item.qty,
  ]);

  const handleQtyChange = (value: number) => {
    console.log(value);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="w-3/4 flex items-center">
          <Image src={item.image} alt={item.name} width={100} height={100} />
          <div className="flex gap-12 ml-6 w-full">
            <div className="flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <h3 className="text-xs text-gray-500">
                {Object.values(
                  item.choosenConfiguration?.priceConfiguration
                ).join(", ")}
              </h3>
              <h3 className="text-xs text-gray-500">
                {item.choosenConfiguration?.selectedToppings
                  .map((selectedTopping) => selectedTopping.name)
                  .join(", ")}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div>{item.qty}</div>
          <QtyChanger handleQtyChange={handleQtyChange}>{item.qty}</QtyChanger>

          <div className="flex">
            <div className="font-bold w-12">&#8377;{totalPrice}</div>
            <button className="ml-4" onClick={() => {}}>
              <X />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
