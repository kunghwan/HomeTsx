import React, { useState } from "react";
import { auth } from "../context/firebase.config"; // Firebase 인증 가져오기
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 페이지 전환
import { User } from "../user.d"; // User 인터페이스 임포트

const PasswordChange = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    newPassword: "",
    name: "",
  });

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 전환

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 값 체크
    if (!user.email || !user.password || !user.newPassword) {
      setUser((prev) => ({ ...prev, error: "모든 필드를 채워야 합니다." }));
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setUser((prev) => ({ ...prev, error: "로그인된 사용자 없음" }));
        return;
      }

      // 재인증을 위한 인증 정보를 생성
      const credential = EmailAuthProvider.credential(
        user.email,
        user.password
      );
      await reauthenticateWithCredential(currentUser, credential);

      // 비밀번호 변경
      await updatePassword(currentUser, user.newPassword);
      setUser((prev) => ({
        ...prev,
        success: "비밀번호가 성공적으로 변경되었습니다!",
        error: "",
      }));

      // 비밀번호 변경이 성공하면 홈으로 이동
      setTimeout(() => {
        navigate("/"); // 홈으로 이동
      }, 2000); // 2초 후에 홈으로 리디렉션
    } catch (err: any) {
      setUser((prev) => ({
        ...prev,
        error: "비밀번호 변경 실패: " + err.message,
        success: "",
      }));
    }
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <input
            type="password"
            id="currentPassword"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="현재 비밀번호를 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            value={user.newPassword}
            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
            placeholder="새 비밀번호를 입력하세요"
          />
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
      {user.error && <p style={{ color: "red" }}>{user.error}</p>}
      {user.success && <p style={{ color: "green" }}>{user.success}</p>}
    </div>
  );
};

export default PasswordChange;
