import { Link, Outlet } from "react-router-dom";
import { AmazonePicture } from "./layoutUrl";
import { IoBasket, IoMenu, IoMoon, IoSearch, IoSunny } from "react-icons/io5";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import RootNavbar from "./RootNavbar";

const Layout = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(document.body.className === "dark");

  const [scroll, setScroll] = useState(0);

  return (
    <div
      className={twMerge(
        "flex items-center gap-x-1 ",
        scroll >= 100 && "fixed top-0 left-0 w-full z-10"
      )}
    >
      <Link to={"/"} className="hover:shadow-md">
        <img src={AmazonePicture} alt="" className="h-15 w-30 " />
      </Link>
      <form
        action=""
        className="flex items-center gap-x-2 "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" className="" />
        <div className=" flex gap-x-2">
          <button>
            <IoSearch />
          </button>
          <button
            className="dark hover:scale-120 trasition dark:bg-black"
            onClick={() => {
              document.body.classList.toggle("dark");
              setDarkMode((prev) => !prev);
            }}
          >
            {darkMode ? (
              <IoMoon className="text-amber-300" />
            ) : (
              <IoSunny className="text-red-400 " />
            )}
          </button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenu(true)}>
          <IoMenu />
        </button>

        {isMenu && <RootNavbar />}
        {/* <button className="md:hidden">
          <IoBasket />
        </button> */}
      </form>
      <Outlet />
    </div>
  );
};

export default Layout;
