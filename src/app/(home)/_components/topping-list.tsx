import { Topping } from "@/lib/types";
import React, { useEffect, useState } from "react";
import ToppingCard from "./topping-card";

const ToppingList = async () => {
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        // todo: make tenantId dynamically and also findByTenantId backend functionality
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=10`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
    };

    fetchData();
  }, []);

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExist = selectedToppings.some(
      (selectTopping) => selectTopping._id === topping._id
    );
    if (isAlreadyExist) {
      setSelectedToppings((prev: Topping[]) =>
        prev.filter((selectTopping) => selectTopping._id !== topping._id)
      );
      return;
    }

    setSelectedToppings((prev: Topping[]) => [...prev, topping]);
  };

  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {toppings?.map((topping) => {
          return (
            <ToppingCard
              topping={topping}
              key={topping._id}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
