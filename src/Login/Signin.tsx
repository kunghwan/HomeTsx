import React, { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Crud from "../Crud/Crud";

const Signin = () => {
  const [lightdark, setLightdark] = useState(false);
  const navi = useNavigate();

  return (
    <div className=" dark:bg-black h-screen">
      <button onClick={() => navi("/passwordChange")}>비밀번호 변경</button>
      <button
        onClick={() => {
          document.body.classList.toggle("dark");
          setLightdark((prev) => !prev);
        }}
        className="bg-amber-600 dark:bg-amber-300 border"
      >
        {lightdark ? <IoMoon /> : <IoSunny />}
      </button>
      <Crud />
    </div>
  );
};

export default Signin;
