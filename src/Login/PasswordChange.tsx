import React, { useState, useCallback, useMemo } from "react"; // React와 useState, useCallback, useMemo 임포트
import { auth } from "../context/firebase.config"; // Firebase 인증을 가져옵니다.
import {
  reauthenticateWithCredential, // 재인증을 위한 Firebase 함수
  EmailAuthProvider, // 이메일 인증 정보를 위한 제공자
  updatePassword, // 비밀번호 업데이트 함수
} from "firebase/auth"; // Firebase의 인증 관련 함수들
import { useNavigate } from "react-router-dom"; // 페이지 전환을 위한 useNavigate 훅

const PasswordChange = () => {
  // user 상태 관리: 이메일, 현재 비밀번호, 새 비밀번호, 이름 등을 관리
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    newPassword: "",
    name: "",
  });

  // useNavigate 훅을 사용하여 홈으로 리디렉션하기 위해 선언
  const navigate = useNavigate();

  // 필수 값 체크 및 에러 메시지 설정을 useMemo로 메모이제이션
  const errorMessage = useMemo(() => {
    if (!user.email || !user.password || !user.newPassword) {
      return "모든 필드를 채워야 합니다.";
    }
    return "";
  }, [user.email, user.password, user.newPassword]);

  // 폼 제출 처리 함수
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault(); // 기본 동작인 폼 제출을 막음

      if (errorMessage) {
        setUser((prev) => ({ ...prev, error: errorMessage }));
        return; // 필드가 비어 있으면 함수 종료
      }

      try {
        // Firebase에서 현재 로그인된 사용자 가져오기
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setUser((prev) => ({ ...prev, error: "로그인된 사용자 없음" }));
          return; // 로그인된 사용자가 없으면 에러 메시지 설정 후 종료
        }

        // 사용자가 입력한 이메일과 비밀번호를 사용하여 인증 자격 증명 생성
        const credential = EmailAuthProvider.credential(
          user.email,
          user.password
        );

        // 재인증: 사용자에게 재인증을 요구하여 비밀번호 변경을 처리하도록 함
        await reauthenticateWithCredential(currentUser, credential);

        // 비밀번호 변경: 새 비밀번호로 변경
        await updatePassword(currentUser, user.newPassword);

        // 성공적인 비밀번호 변경 후 상태 업데이트 (성공 메시지 표시)
        setUser((prev) => ({
          ...prev,
          success: "비밀번호가 성공적으로 변경되었습니다!",
          error: "",
        }));

        // 비밀번호 변경 후 2초 뒤에 홈으로 리디렉션
        setTimeout(() => {
          navigate("/"); // 홈 페이지로 이동
        }, 2000); // 2초 후에 리디렉션
      } catch (err: any) {
        // 오류 발생 시 에러 메시지 설정
        setUser((prev) => ({
          ...prev,
          error: "비밀번호 변경 실패: " + err.message,
          success: "",
        }));
      }
    },
    [errorMessage, user.email, user.password, user.newPassword, navigate]
  );

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        {/* 이메일 입력 */}
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

        {/* 현재 비밀번호 입력 */}
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

        {/* 새 비밀번호 입력 */}
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

        {/* 제출 버튼 */}
        <button type="submit">비밀번호 변경</button>
      </form>

      {/* 오류 메시지 출력 */}
      {user.error && <p style={{ color: "red" }}>{user.error}</p>}

      {/* 성공 메시지 출력 */}
      {user.success && <p style={{ color: "green" }}>{user.success}</p>}
    </div>
  );
};

export default PasswordChange;
