"use server";

import React from "react";
import readUserSession, { readUser } from "../(auth)/actions";
import { redirect } from "next/navigation";
import { Toaster } from "~/components/ui/toaster";
import * as Separator from "@radix-ui/react-separator";
import Carousel from "./components/carousel/EmblaCarousel";
import Hero from "./components/carousel/EmblaCarousel";
import EmblaCarousel from "./components/carousel/EmblaCarousel";

import "./components/carousel/embla.css";
import { api } from "~/trpc/server";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  dragFree: false,
  dragThreshold: 5,
  loop: true,
};
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const color = "red";

const ColoredLine = ({}) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 16,
      width: 1,
    }}
  />
);

const categories = [
  "Fruits",
  "Vegetables",
  "Meat",
  "Dairy",
  "Beverages",
  "Bread",
  "Frozen",
  "Snacks",
];

export default async function page() {
  const { data } = await readUser();

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-6">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-6">
                <div className="text-[15px] leading-5 text-black">
                  {category}
                </div>
                {category === "Snacks" ? null : <ColoredLine />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-screen justify-center">
        <div className="w-full">
          <Toaster />
          <div className="w-full ">
            <div className="text-[15px] leading-5 text-white">Source</div>

            {categories.map((category) => (
              <EmblaCarousel
                key={category}
                slides={SLIDES}
                options={OPTIONS}
                title={category}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
