import React, { useEffect } from "react";
import { Icons } from "~/components/icons";

type PropType = {
  title: string;
  stores: { name: string; price: number }[];
  price: number;
  quantity: number;
  imageUrl: string;
  onFavorite: () => void;
  onAddToCart: () => void;
};

const Card = ({
  title,
  stores,
  price,
  quantity,
  imageUrl,
  onFavorite,
  onAddToCart,
}: PropType) => {
  useEffect(() => {
    console.log("Card component mounted");
    return () => {
      console.log("Card component unmounted");
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div className="flex">
          <div className="w-1/2">
            <h2 className="mb-4 text-xs font-bold">{title}</h2>
            <ul className="mb-4">
              {stores.map((store, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-xs">{store.name}</span>
                  <span className="text-xs">${store.price}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <p className="text-xs text-gray-600">Price: ${price}</p>
              <p className="text-xs text-gray-600">Quantity: {quantity}</p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={imageUrl}
              alt="Product"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>

        <div className="absolute -bottom-16 left-0 right-0 flex translate-y-1/2 transform justify-center overflow-auto">
          <button
            className="border-#DFDFDF  mr-2 border-2 border-solid bg-white px-4 py-2 text-xs text-white focus:outline-none"
            onClick={onFavorite}
          >
            <Icons.heart className="stroke-neutral-400" />
          </button>
          <button
            className="border-#DFDFDF border-2 border-solid bg-emerald-300 px-4 py-2 text-xs text-white focus:outline-none"
            onClick={onAddToCart}
          >
            <Icons.shoppingCart />
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
