import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./context/firebase.config";
import Loading from "./context/Loading";

const App = () => {
  const [email, setEmail] = useState(import.meta.env.DEV ? "" : "1");
  const [password, setPassword] = useState(import.meta.env.DEV ? "" : "1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const navi = useNavigate();
  const IdRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);

  // 로그인 처리 함수
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (email.length === 0) {
        alert("아이디를 입력해줘");
        IdRef.current?.focus();
        return;
      }
      if (password.length === 0) {
        alert("비밀번호를 입력해줘");
        PasswordRef.current?.focus();
        return;
      }

      // 로그인 처리 전 로딩 상태를 true로 설정
      setLoading(true);

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log("로그인 성공", user);
        alert("성공!");
        navi("/signin");
      } catch (err: any) {
        setError("로그인 실패" + err.message);
      } finally {
        // 로그인 요청 후 로딩 상태를 false로 설정
        setLoading(false);
      }
    },
    [email, password, navi]
  );

  return (
    <>
      {/* 로딩 상태가 true일 때만 로딩 화면을 표시 */}
      {loading ? (
        <Loading /> // 로딩 중일 때만 로딩 화면을 표시
      ) : (
        <form
          className="flex flex-col w-50 mx-auto items-center justify-center h-100 gap-y-2.5"
          onSubmit={onSubmit}
        >
          <div>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              placeholder="example@naver.com"
              ref={IdRef}
              id="id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              placeholder="******************"
              ref={PasswordRef}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          <button className="w-100 mt-8">로그인</button>
        </form>
      )}
    </>
  );
};

export default App;
