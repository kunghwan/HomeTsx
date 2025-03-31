import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useRef, useState } from "react";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  onLoginSuccess: (user: User) => void; // 로그인 성공 시 호출될 함수
}
const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async () => {
    if (email.length === 0) {
      alert("이메일 입력");
      emailRef.current?.focus();
      return;
    }

    if (password.length === 0) {
      alert("비번입력 ");
      passwordRef.current?.focus();
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        email: user.email,
        name: user.displayName || "사용자",
      };
      onLoginSuccess(userData);
    } catch (error: any) {
      console.error("로그인 실패:", error);
    }
    navi("/myinfo");
  }, [email, password, navi]);
  return (
    <>
      <div className="flex items-center h-screen flex-col mt-5">
        <form
          className="flex flex-col gap-6 w-96 border p-6 rounded-lg border-gray-200"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                className="bg-gray-100 p-2 rounded"
                placeholder="email@email.com"
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                className="bg-gray-100 p-2 rounded"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />
            </div>
          </div>
          <button className="w-full rounded-full h-10 bg-blue-500 text-white text-sm mt-4">
            로그인
          </button>
        </form>
        {/* 회원가입 버튼 폼 밖에 배치 */}

        <div className="my-5 relative flex justify-center w-95 ">
          <p className="bg-white px-2.5 text-xs dark:bg-darkBg">
            또는 회원가입
          </p>
          {/* line 수정: span에 z-index를 고정하여 선을 보이도록 함 */}
          <span className="absolute top-[50%] -z-10  w-full h-[1px] bg-black dark:bg-darkColor"></span>
        </div>
        <button className="w-90 py-2 rounded-full border border-gray-300 text-sm text-center mt-4">
          회원가입
        </button>
      </div>
    </>
  );
};
export default AuthPage;
