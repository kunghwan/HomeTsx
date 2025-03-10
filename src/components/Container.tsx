import React from "react";
import { twMerge } from "tailwind-merge";

type container = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Row = (props: container) => {
  return <div {...props} className={twMerge("flex", props?.className)}></div>;
};
