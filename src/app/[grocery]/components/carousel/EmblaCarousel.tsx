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

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  title: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, title } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container ml-4 flex">
            {slides.map((index) => (
              <div className="embla__slide min-w-0 flex-1 pl-4" key={index}>
                <div className="embla__slide__number  border-#DFDFDF border-2 border-solid">
                  <Card
                    title="Product Title"
                    stores={[{ name: "Store", price: 10 }]}
                    price={10}
                    quantity={10}
                    imageUrl="https://via.placeholder.com/150"
                    onFavorite={() => {}}
                    onAddToCart={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EmblaCarousel;
