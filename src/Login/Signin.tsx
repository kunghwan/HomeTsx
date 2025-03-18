import React from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navi = useNavigate();

  return (
    <div>
      <button onClick={() => navi("/passwordChange")}>비밀번호 변경</button>
    </div>
  );
};

export default Signin;
