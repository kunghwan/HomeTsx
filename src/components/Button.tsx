import { twMerge } from "tailwind-merge";

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonSet = (props: ButtonType) => {
  return (
    <button
      {...props}
      className={twMerge(
        "p-3 bg-red-500  cursor-pointer rounded text-white",
        props?.className
      )}
    ></button>
  );
};
