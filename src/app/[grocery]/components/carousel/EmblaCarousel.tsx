"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButtons";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Card from "./item-card";
import { Item } from "@prisma/client";
import { api } from "~/trpc/react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  title: string;
};

function EmblaCarousel(props: PropType) {
  const { slides, options, title } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [page, setPage] = React.useState(0);
  const [myData, setMyData] = React.useState([] as Item[]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { data, refetch, fetchNextPage, isSuccess } =
    api.item.getAll.useInfiniteQuery(
      {
        limit: 6,
        take: 6,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (!data) return;

  return (
    <>
      <section className="embla mx-auto  w-full max-w-7xl p-2">
        <div className="flex w-full items-center pl-4">
          <div className="flex-1 grow">
            <p className="text-2xl font-bold">{title}</p>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <p>View all</p>

            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
                fetchNextPage();
              }}
            >
              {" "}
              Load more{" "}
            </button>
          </div>
        </div>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container ml-4 flex">
            {data ? (
              data.pages?.map((page) =>
                page.items.map((item: Item) => (
                  <div
                    className="embla__slide min-w-0 flex-1 pl-4"
                    key={item.name}
                  >
                    <div className="embla__slide__number  border-#DFDFDF border-2 border-solid">
                      <Card
                        title={item.name || "ERROR"}
                        stores={[{ name: "Store", price: 10 }]}
                        price={2.99}
                        quantity={10}
                        imageUrl="https://via.placeholder.com/150"
                        onFavorite={() => {}}
                        onAddToCart={() => {}}
                      />
                    </div>
                  </div>
                )),
              )
            ) : (
              <p>No items found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default EmblaCarousel;
