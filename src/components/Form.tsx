import { twMerge } from "tailwind-merge";

type FormType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const FormSet = (props: FormType) => {
  return <form {...props} className={twMerge("flex", props?.className)}></form>;
};
