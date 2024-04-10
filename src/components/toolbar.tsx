import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from "@radix-ui/react-icons";
import SelectDemo from "./search-select";

const ToolbarDemo = () => (
  <Toolbar.Root
    className="shadow-blackA4 flex w-full min-w-max rounded-md bg-white shadow-[0_2px_10px]"
    aria-label="Formatting options"
  >
    <SelectDemo></SelectDemo>
  </Toolbar.Root>
);

export default ToolbarDemo;
