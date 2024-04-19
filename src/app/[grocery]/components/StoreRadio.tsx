import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { title } from "process";
import "./Radio.css";

interface RadioGroupProps {
  options: string[];
  defaultValue: string;
  ariaLabel: string;
  title: string;
  category: string;
}

const RadioGroupDemo = (props: RadioGroupProps) => (
  <form>
    <RadioGroup.Root
      className="flex flex-col gap-2.5"
      defaultValue={props.defaultValue}
      aria-label="View density"
    >
      {props.options.map((option) => (
        <div
          className="flex items-center"
          key={option + props.title + props.category}
        >
          <label
            className="text-gray flex cursor-pointer pl-[2px] pr-[2px] text-[10px] leading-none"
            htmlFor={"r1" + option + props.title + props.category}
          >
            <RadioGroup.Item
              value={option}
              id={"r1" + option + props.title + props.category}
            >
              <RadioGroup.Indicator className="relative ml-[-8px] flex h-full w-full items-center justify-center after:block after:h-[6px] after:w-[6px] after:rounded-[50%] after:bg-violet11 " />
            </RadioGroup.Item>
            <div className="flex">
              <span className="pr-1"> {option}</span>
              <span> $2.99/100ml</span>
            </div>
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </form>
);

export default RadioGroupDemo;
