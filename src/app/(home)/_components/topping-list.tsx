"use client";

import React, { useState } from "react";
import ToppingCard, { Topping } from "./topping-card";

const toppings = [
  {
    _id: "1",
    name: "John",
    image: "/pizza-main.png",
    price: 20,
    isAvailable: true,
  },
  {
    _id: "2",
    name: "John",
    image: "/pizza-main.png",
    price: 40,
    isAvailable: true,
  },
  {
    _id: "3",
    name: "Jake",
    image: "/pizza-main.png",
    price: 30,
    isAvailable: true,
  },
];

const ToppingList = () => {
  const [selectedToppings, setSelectedToppings] = useState([toppings[0]]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExist = selectedToppings.some(
      (selectTopping) => selectTopping._id === topping._id
    );
    if (isAlreadyExist) {
      setSelectedToppings((prev) =>
        prev.filter((selectTopping) => selectTopping._id !== topping._id)
      );
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
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
