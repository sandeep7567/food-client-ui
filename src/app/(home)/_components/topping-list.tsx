import { Topping } from "@/lib/types";
import { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const searchParams = useSearchParams();
  const resutrantId = searchParams.get("resutrantId");
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        // todo: make tenantId dynamically and also findByTenantId backend functionality
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${resutrantId}`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings);
    };

    fetchData();
  }, [resutrantId]);

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
