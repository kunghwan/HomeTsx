import { useMemo } from "react";
import { AUTH } from "../context";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface RootNavbarProps {
  menuHandler: () => void;
}

interface Menu {
  to?: string;
  name: string;
}

const RootNavbarProps = ({ menuHandler }: RootNavbarProps) => {
  const { user, signout } = AUTH.use();
  const menus: Menu[] = useMemo(() => {
    const items: Menu[] = [
      { name: "홈", to: "/" },
      { name: "상품보기", to: "/product" },
      { name: "나의정보", to: "/MyInfo" },
    ];

    if (user) {
      items.push(
        { name: "장바구니", to: "cart" },
        { name: "주문내역", to: "orders" },
        { name: "로그아웃" }
      );
    }

    return items;
  }, [user]);
  const location = useLocation();

  return (
    <nav className=" fixed top-18 z-10 flex flex-col w-full items-center gap-y-2.5  p-3 text-xl sm:text-red-700 md:relative md:top-0 md:flex md:text-xl lg:top-0 border  bg-amber-50">
      {menus.map(({ name, to }) => {
        const isCurrentPath = to === location.pathname;
        const onClick = () => {
          menuHandler();
          if (name === "로그아웃") {
            signout();
          }
        };

        return (
          <Link
            to={
              name === "로그아웃"
                ? location.pathname === "/MyInfo"
                  ? "/"
                  : to!
                : to!
            }
            key={name}
            onClick={onClick}
            className={twMerge(
              "text-red-500 sm:text-red-500 flex ",
              isCurrentPath && "text-theme",
              (name === "홈" || name === "상품보기") && "md:hidden"
            )}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default RootNavbarProps;
