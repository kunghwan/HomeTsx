import { AmazonePicture } from "./layoutUrl";
import { Link } from "react-router-dom";
import { IoMenu, IoMoon, IoSearch, IoSunny } from "react-icons/io5";
import { useState } from "react";
import RootNavbar from "./RootNavbar";

const Layout = () => {
  const [lightBlack, setLightBlack] = useState(
    document.body.className === "dark"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuHandler = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className=" flex gap-x-2.5 items-center ">
      {/* amazone 이미지 */}
      <div className="mx-auto flex max-w-300 ">
        <Link to={"/"}>
          <img
            src={AmazonePicture}
            alt=""
            className="h-20  hover:opacity-80 object-cover
        "
          />
        </Link>

        {/* 검색창 */}
        <form
          className=" flex items-center gap-x-2.5 flex-1"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            className=""
          />
          <div className="flex gap-x-2.5  ">
            <button>
              <IoSearch />
            </button>
            <button
              onClick={() => {
                document.body.classList.toggle("dark");
                setLightBlack((prev) => !prev);
              }}
              className="dark:bg-amber-300"
            >
              {lightBlack ? <IoMoon /> : <IoSunny />}
            </button>
            {/* 메뉴판 */}
            <div>
              <button
                className="text-2xl w-10 bg-bg dark:bg-darkBorder md:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <IoMenu />
              </button>
              <div className="hidden md:block">
                <RootNavbar menuHandler={menuHandler} />
              </div>
              {isMenuOpen && <RootNavbar menuHandler={menuHandler} />}
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Layout;
