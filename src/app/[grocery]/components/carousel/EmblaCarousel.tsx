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
import { EmblaCarouselType } from "embla-carousel";
import { useCartStore } from "~/stores/cart";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  title: string;
};

function EmblaCarousel(props: PropType) {
  const { slides, options, title } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollProgress = React.useCallback(
    (emblaApi: EmblaCarouselType) => {
      return () => {
        const progress = emblaApi.scrollProgress();
        return progress;
      };
    },
    [emblaApi?.scrollProgress()],
  );

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on("slidesInView", scrollProgress);

      console.log(emblaApi.scrollProgress());

      if (emblaApi.scrollProgress() > 0.25) {
        if (hasNextPage) {
          console.log("fetching next page");
          fetchNextPage();
        }
      }
    }
  }, [emblaApi, scrollProgress]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { data, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.item.getAll.useInfiniteQuery(
      {
        limit: 7,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (!data) return;

  const fakeData = {
    pages: [
      {
        items: [
          {
            name: "Item 1",
            price: 2.99,
            quantity: 10,
            stores: [{ name: "Store", price: 10 }],
          },
          {
            name: "Item 2",
            price: 2.99,
            quantity: 10,
            stores: [{ name: "Store", price: 10 }],
          },
        ],
        nextCursor: "blank",
      },
    ],
  };

  return (
    <>
      <section className="embla mx-auto  w-full max-w-7xl p-2">
        <div className="flex w-full items-center pl-4">
          <div className="flex-1 grow">
            <p className="text-2xl font-bold">{title}</p>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <button>View all</button>

            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={prevBtnDisabled}
            />
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
                        item={item}
                        category={title}
                        stores={[{ name: "Store", price: 10 }]}
                        price={2.99}
                        quantity={10}
                        imageUrl="https://via.placeholder.com/150"
                        onFavorite={() => {}}
                      />
                    </div>
                  </div>
                )),
              )
            ) : (
              <p>No items found</p>
            )}
            {isFetchingNextPage ? (
              <div className="embla__slide min-w-0 flex-1 pl-4" key={"temp 1"}>
                <div className="embla__slide__number  border-#DFDFDF border-2 border-solid">
                  <Card
                    title={"LOADING..."}
                    stores={[{ name: "Store", price: 10 }]}
                    price={2.99}
                    quantity={10}
                    imageUrl="https://via.placeholder.com/150"
                    onFavorite={() => {}}
                    onAddToCart={() => {}}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

export default EmblaCarousel;
