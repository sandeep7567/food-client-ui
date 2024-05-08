import Image from "next/image";
import { Product } from "@/lib/types";
import ToppingList from "@/app/(home)/_components/topping-list";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProductModal = ({ product }: { product: Product }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-primary/40 hover:bg-primary/30 text-primary font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <div className="flex">
          <div className="w-1/3 bg-white rounded p-8 flex justify-center items-center">
            <Image
              src={"/pizza-main.png"}
              width={450}
              height={450}
              alt={product?.name}
            />
          </div>
          <div className="w-2/3 p-8">
            <h3 className="text-xl font-bold ">{product?.name}</h3>
            <p className="mt-1">{product?.description}</p>

            {Object.entries(product.category.priceConfiguration).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <h4 className="mt-6">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      className="grid grid-cols-3 gap-4 mt-2"
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

            <ToppingList />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
