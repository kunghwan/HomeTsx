import React from "react";
import { twMerge } from "tailwind-merge";

type container = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Row = (props: container) => {
  return <div {...props} className={twMerge("div-ch", props?.className)} />;
};
export const Noraml = (props: container) => {
  return <div {...props} className="div-con" />;
};
