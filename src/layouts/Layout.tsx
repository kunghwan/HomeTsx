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

  // 다크 모드 토글 함수
  const toggleTheme = () => {
    setLightBlack(!lightBlack);
    document.body.classList.toggle("dark");
  };

  return (
    <header className="mx-auto flex items-center  p-4 bg-white dark:bg-gray-900 border-b border-gray-200 justify-center">
      {/* 아마존 이미지 */}
      <Link to="/" className="flex-shrink-0">
        <img src={AmazonePicture} alt="Amazon" className="h-10 w-auto" />
      </Link>

      {/* 검색 입력 */}
      <div className="relative flex-grow mx-4 max-w-[400px]">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="w-full h-10  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* 아이콘 및 버튼들 */}
      <div className="flex items-center gap-x-4">
        {/* 검색 버튼 */}
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <IoSearch className="text-xl" />
        </button>

        {/* 다크 모드 버튼 */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {lightBlack ? (
            <IoMoon className="text-xl" />
          ) : (
            <IoSunny className="text-xl" />
          )}
        </button>

        {/* 메뉴 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <IoMenu className="text-xl" />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && <RootNavbar menuHandler={menuHandler} />}
    </header>
  );
};

export default Layout;
