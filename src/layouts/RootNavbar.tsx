import { useMemo } from "react";
import { AUTH } from "../context";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
interface Props {
  menuHandler: () => void;
}

interface Menu {
  to?: string;
  name: string;
}

const RootNavbar = ({ menuHandler }: Props) => {
  const { user, signout } = AUTH.use();
  const menus: Menu[] = useMemo(() => {
    const items: Menu[] = [
      { to: "/", name: "홈" },
      { to: "/product", name: "상품보기" },
      { to: "/myaccount", name: "나의정보" },
    ];

    if (user) {
      items.push(
        { to: "/cart", name: "장바구니" },
        { to: "orders", name: "주문내역" },
        { name: "로그아웃" }
      );
    }

    return items;
  }, [user]);

  const location = useLocation();

  return (
    <nav className="fixed  flex flex-col top-15 w-full left-0 items-center gap-y-2.5 mt-3 border-t-1 border-gray-200 md:relative md:flex md:w-auto md:top-0">
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
            onClick={onClick}
            to={
              name === "로그아웃"
                ? location.pathname === "/myaccount"
                  ? "/"
                  : to!
                : to!
            }
            key={name}
            className={twMerge(
              "text-xl mt-1.5 z-10",
              isCurrentPath && "text-red-400",
              (name === "홈" || name === "나의정보") && "md:hidden"
            )}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default RootNavbar;
