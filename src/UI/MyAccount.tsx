import { useEffect, useState } from "react";
import AuthPage from "./AuthPage";
import { useNavigate } from "react-router-dom";

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

  return <>{!user ? <AuthPage onLoginSuccess={LoginSuc} /> : <h1>dsf</h1>}</>;
};
export default MyAccount;
