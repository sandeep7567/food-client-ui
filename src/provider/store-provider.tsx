"use client";

import { setInitialCartItems } from "@/lib/store/features/cart/cart-slice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");

      try {
        const parsedItems = cartItems && JSON.parse(cartItems);
        storeRef.current.dispatch(setInitialCartItems(parsedItems));
      } catch (err) {
        console.error(err);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
