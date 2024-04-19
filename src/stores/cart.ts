import { Item } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends Item {
  count: number;
}

export type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (item: Item) => void;
  remove: (idProduct: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartStore>(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        if (cart.length)
          return cart
            .map((item) => item.count)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      add: (item: Item) => {
        const { cart } = get();
        const updatedCart = updateCart(item, cart);
        set({ cart: updatedCart });
      },
      remove: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
      },
      removeAll: () => set({ cart: [] }),
    }),
    { name: "cart" },
  ),
);

function updateCart(item: Item, cart: CartItem[]): CartItem[] {
  const cartItem = { ...item, count: 1 } as CartItem;

  const productOnCart = cart.map((item) => item.id).includes(item.id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item.id === item.id)
        return { ...item, count: item.count + 1 } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
