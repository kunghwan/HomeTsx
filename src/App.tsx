import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./context/firebase.config";

const App = () => {
  const [email, setEmail] = useState(import.meta.env.DEV ? "" : "1");

  const [password, setPassword] = useState(import.meta.env.DEV ? "" : "1");

  const [error, setError] = useState("");

  const navi = useNavigate();

  const IdRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);

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
      }
    },
    [IdRef, email, password, PasswordRef, navi]
  );

  return (
    <>
      <form
        className=" flex flex-col w-50 mx-auto items-center justify-center h-100 gap-y-2.5"
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
        {error && <p>실패</p>}
        <button className=" w-100 mt-8 ">로그인</button>
      </form>
    </>
  );
};

export default App;
