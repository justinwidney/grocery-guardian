import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import RadioGroupDemo from "./StoreRadio";

const TAGS = Array.from({ length: 4 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

interface scrollType {
  title: string;
  category: string;
}

const ScrollAreaDemo = (props: scrollType) => (
  <ScrollArea.Root className="h-[60px] w-full overflow-hidden ">
    <ScrollArea.Viewport className="h-full w-full rounded">
      <div className="">
        <RadioGroupDemo
          options={TAGS}
          defaultValue={TAGS[0] || ""}
          ariaLabel="Version tags"
          title={props.title}
          category={props.category}
        />
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollArea.Scrollbar>

    <ScrollArea.Corner className="bg-blackA5" />
  </ScrollArea.Root>
);

export default ScrollAreaDemo;
