"use client";

import React, { useEffect } from "react";
import { Icons } from "~/components/icons";
import ScrollAreaDemo from "../ScrollArea";
import { Item } from "@prisma/client";
import { CartStore, useCartStore } from "~/stores/cart";
import useStore from "~/stores/useStore";

type PropType = {
  item: Item;
  category: string;
  stores: { name: string; price: number }[];
  price: number;
  quantity: number;
  imageUrl: string;
  onFavorite: () => void;
};

const Card = ({
  item,
  stores,
  price,
  category,
  quantity,
  imageUrl,
  onFavorite,
}: PropType) => {
  const { name } = item;

  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state,
  );

  if (!cartStore) return;

  const { count, add, cart, incrementItem } = cartStore;

  return (
    <>
      <div className="relative flex w-full px-2 pl-4 ">
        <div className="flex w-full flex-col">
          <div className="w-full">
            <h2 className=" pt-2 text-base  font-bold ">{name}</h2>
          </div>
          <div className="flex">
            <div className="w-7/12">
              <div className="mb-4 flex h-4 flex-row items-center justify-between ">
                <p className="text-netural-400 text-sm font-light">beatrice</p>
                <Icons.ellipsis />
              </div>
              <ul className="mb-4">
                {stores.map((store, index) => (
                  <li key={index} className="flex justify-between">
                    <ScrollAreaDemo title={name} category={category} />
                  </li>
                ))}
              </ul>

              <div className="flex justify-between">
                <p className="text-lg font-bold">${price}</p>
                <p className="text-sm text-neutral-400">sold as: {quantity}L</p>
              </div>
            </div>
            <div className="w-5/12 pt-4 ">
              <img
                src="https://assets.shop.loblaws.ca/products/21369455/b2/en/front/21369455_front_a06_@2.png"
                alt="Product"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-0 left-0 ml-[-2] flex translate-y-1/2 transform justify-center overflow-auto">
          <button
            className="border-#DFDFDF  mr-2 border-2 border-solid bg-white px-4 py-2 text-xs text-white focus:outline-none"
            onClick={onFavorite}
          >
            <Icons.heart className="stroke-neutral-400" />
          </button>

          {cart.find((cartItem) => cartItem.id === item.id) ? (
            <button
              className="border-#DFDFDF border-2 border-solid bg-emerald-300 px-4 py-2 text-xs text-white focus:outline-none"
              onClick={() => incrementItem(item.id)}
            >
              {cart.find((cartItem) => cartItem.id === item.id)?.count}
            </button>
          ) : (
            <button
              className="border-#DFDFDF border-2 border-solid bg-emerald-300 px-4 py-2 text-xs text-white focus:outline-none"
              onClick={() => add(item)}
            >
              <Icons.shoppingCart />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
