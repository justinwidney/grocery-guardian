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
  incrementItem: (id: string) => void;
};

export const useCartStore = create<CartStore, [["zustand/persist", unknown]]>(
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
        const updatedCart = addToCart(cart, item);
        set({ cart: updatedCart });
      },
      incrementItem: (id: string) => {
        const { cart } = get();
        const updatedCart = incrementInCart(cart, id);
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

const addToCart = (cart: CartItem[], product: Item): CartItem[] => {
  const item = cart.find((item) => item.id === product.id);

  if (item) {
    return cart.map((item) => {
      if (item.id === product.id) {
        const itemCount = item.count >= 1 ? item.count : 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
  }

  return [...cart, { ...product, count: 1 }];
};

function incrementInCart(cart: CartItem[], id: string): CartItem[] {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
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
