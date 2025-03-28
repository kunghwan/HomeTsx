import { useMemo } from "react";
import { AUTH } from "../context";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  menuHandler: () => void;
  isMenuOpen: boolean; // 메뉴가 열렸는지 여부를 prop으로 받기
}

interface Menu {
  to?: string;
  name: string;
}

const RootNavbar = ({ menuHandler, isMenuOpen }: Props) => {
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
        { to: "/orders", name: "주문내역" },
        { name: "로그아웃" }
      );
    }

    return items;
  }, [user]);

  const location = useLocation();

  return (
    <nav className="fixed flex flex-col top-15 w-full left-0 items-center gap-y-2.5 mt-3 border-t-1 border-gray-200 md:relative md:flex-row md:gap-x-6 md:w-auto md:top-0">
      {menus.map(({ name, to }) => {
        const isCurrentPath = to === location.pathname; // 현재 경로와 비교
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
              isCurrentPath && "text-red-400 text-center border h-10", // 현재 경로 강조
              "md:flex md:items-center md:border-none md:mt-0 md:py-2 md:px-4 md:text-base md:text-black dark:md:text-white", // md에서 적용되는 스타일 추가
              !isMenuOpen && // 메뉴가 닫혔을 때
                (isCurrentPath ? "text-red-400" : "text-transparent"), // 현재 경로만 보이도록 처리
              !isMenuOpen && // 메뉴가 닫힌 상태에서
                !(name === "홈" || name === "나의정보") &&
                "hidden", // "홈"과 "나의정보" 제외한 항목 숨기기
              !isCurrentPath && "hover:text-red-400", // 현재 경로가 아니면 hover 시 강조
              (name === "홈" || name === "나의정보") && "md:block" // md 크기에서 "홈"과 "나의정보"만 보이도록 처리
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
