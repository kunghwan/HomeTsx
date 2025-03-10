import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { Button, Container, Form } from "./components";
import { Input, Label } from "./components/InputLabel";

import { useNavigate } from "react-router-dom";

const App = () => {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  const initialState = useMemo(
    () => ({
      email: "",
      password: "",
    }),

    []
  );
  const [user, setUser] = useState(initialState);
  const navi = useNavigate();

  const onChangeProps = useCallback(
    (target: keyof typeof user, value: string) => {
      setUser((prev) => ({ ...prev, [target]: value }));
    },
    []
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (user.email.length === 0) {
      emailref.current?.focus();
      return alert("이메일 입력");
    }

    if (user.password.length === 0) {
      passwordref.current?.focus();
      return alert("비번입력");
    }

    if (user.email === "ysw03031@naver.com" && user.password === "123123") {
      alert("로그인 성공");
      navi("/intr");
    }
  };

  return (
    <Form.FormSet
      className="flex flex-col gap-y-1.5 items-center h-200 justify-center"
      onSubmit={onSubmit}
    >
      <Container.Row className="flex gap-x-6">
        <Label htmlFor="email">이메일</Label>
        <Input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => onChangeProps("email", e.target.value)}
          ref={emailref}
        />
      </Container.Row>
      <Container.Row className="flex gap-x-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => onChangeProps("password", e.target.value)}
          ref={passwordref}
        />
      </Container.Row>
      <Button.ButtonSet className="mt-5">로그인</Button.ButtonSet>
    </Form.FormSet>
  );
};

export default App;
