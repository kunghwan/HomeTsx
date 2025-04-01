import { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <div>{children ?? <>sdfsdf</>}</div>;
};
export default AuthProvider;
