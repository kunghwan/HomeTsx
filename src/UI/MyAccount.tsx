import { useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import { useNavigate } from "react-router-dom";
import MyTab from "./MyTab";
import MyBasicInfo from "./MyBasicInfo";
import MyPassword from "./MyPassword";
import MyProducts from "./MyProducts";
import AddProduct from "./AddProduct";
import { MY } from "../context";

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const navi = useNavigate();

  const LoginSuc = (userData: User) => {
    setUser(userData);
    navi("./myinfo");
  };

  useEffect(() => {
    if (user) {
      console.log("로그인 성공: ", user); // 로그인된 유저 정보 확인
    }
  }, [user]);
  const { target } = MY.store();

  return (
    <>
      {!user ? (
        <AuthPage onLoginSuccess={LoginSuc} />
      ) : (
        <div
          className="flex max-w-300 mx-auto px-2.5"
          style={{
            minHeight: "calc(100vh - 61px)",
          }}
        >
          <MyTab />
          <main className="m-5 flex-1">
            {
              {
                기본정보: <MyBasicInfo {...user} />,
                비밀번호변경: <MyPassword {...user} />,
                나의상품: <MyProducts {...user} />,
                상품등록: <AddProduct {...user} />,
              }[target]
            }
          </main>
        </div>
      )}
    </>
  );
};
export default MyAccount;
