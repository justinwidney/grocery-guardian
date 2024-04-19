"use client";

import { CartStore, useCartStore } from "~/stores/cart";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import { cn } from "~/utils/form-handling";
import useStore from "~/stores/useStore";

function Basket() {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state,
  );

  if (!cartStore) return;

  const { count } = cartStore;

  return (
    <>
      <Icons.shoppingBasket />
      <span className="px-4"> {count()} </span>
    </>
  );
}

export default Basket;
