import { twMerge } from "tailwind-merge";

type labelType = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
export const Label = (props: labelType) => {
  return (
    <label
      {...props}
      className={twMerge("text-blue-300", props?.className)}
    ></label>
  );
};
type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (props: InputType) => {
  return (
    <input
      {...props}
      className={twMerge("border text-gray-400 rounded", props?.className)}
    />
  );
};
