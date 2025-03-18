import { useEffect, useState } from "react";
import { db, auth } from "./context/firebase.config"; // Firebase 설정 가져오기
import {
  createUserWithEmailAndPassword, // Firebase로 이메일과 비밀번호로 사용자 생성
  signInWithEmailAndPassword, // Firebase로 이메일과 비밀번호로 로그인
  signOut, // Firebase에서 로그아웃
  onAuthStateChanged, // 인증 상태 변경을 감지하는 함수
  User, // 사용자 객체 타입 정의
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore에서 문서를 읽는 함수

// 숫자에 쉼표 추가하는 함수
const formatNumber = (num: number) => {
  return num.toLocaleString(); // 숫자에 쉼표를 추가해주는 내장 함수
};

const App2 = () => {
  // price 상태는 초기값으로 100000을 설정
  const [price, setPrice] = useState(100000);

  // user 상태: Firebase에서 로그인된 사용자의 정보를 저장
  const [user, setUser] = useState<User | null>(null);

  // 이메일과 비밀번호를 관리하는 상태
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 오류 메시지를 관리하는 상태
  const [error, setError] = useState<string>("");

  // Firestore에서 특정 문서를 참조하는 코드 (users 컬렉션의 문서를 참조)
  const docRef = doc(db, "users", "FlfZ5I3PptCBFgDDJc82");

  // Firestore에서 데이터를 읽는 함수
  const getDeta = async () => {
    const docSnap = await getDoc(docRef); // 문서 참조를 통해 데이터를 읽음
    if (docSnap.exists()) {
      console.log(docSnap.data()); // 문서가 존재하면 데이터를 출력
    } else {
      console.log("No such document!"); // 문서가 존재하지 않으면 메시지 출력
    }
  };

  useEffect(() => {
    getDeta(); // 컴포넌트가 처음 렌더링될 때 Firestore 데이터 읽기

    // 사용자의 인증 상태를 구독 (로그인 여부 체크)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 사용자의 로그인 상태 변경 시 user 상태 업데이트
    });

    return () => unsubscribe(); // 컴포넌트가 unmount 될 때 구독을 해제
  }, []); // 빈 배열을 넣어서 한 번만 실행되도록 설정

  // 로그인 함수
  const handleLogin = async () => {
    try {
      // Firebase로 이메일과 비밀번호를 통해 로그인 시도
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // 로그인 성공하면 오류 메시지 초기화
    } catch (err) {
      setError("로그인 실패: " + err.message); // 오류 발생 시 메시지 표시
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃
    } catch (err) {
      setError("로그아웃 실패: " + err.message); // 오류 발생 시 메시지 표시
    }
  };

  // 사용자 추가 (회원가입) 함수
  const handleSignUp = async () => {
    try {
      // Firebase로 이메일과 비밀번호를 통해 사용자 등록
      await createUserWithEmailAndPassword(auth, email, password);
      setError(""); // 회원가입 성공하면 오류 메시지 초기화
    } catch (err) {
      setError("회원가입 실패: " + err.message); // 오류 발생 시 메시지 표시
    }
  };

  return (
    <div>
      <h1>{formatNumber(price)}</h1>{" "}
      {/* price 값을 숫자 형식으로 출력 (쉼표 추가) */}
      <button onClick={() => setPrice(price)}>Increase Price</button>{" "}
      {/* 가격 증가 버튼 */}
      {/* 로그인 상태에 따라 다른 UI 표시 */}
      {user ? (
        <div>
          <p>Welcome, {user.email}</p> {/* 로그인된 사용자의 이메일을 표시 */}
          <button onClick={handleLogout}>Log Out</button> {/* 로그아웃 버튼 */}
        </div>
      ) : (
        <div>
          <h2>Login</h2> {/* 로그인 화면 */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 변경
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 변경
            placeholder="Password"
          />
          <button onClick={handleLogin}>Log In</button> {/* 로그인 버튼 */}
          <h2>Sign Up</h2> {/* 회원가입 화면 */}
          <button onClick={handleSignUp}>Sign Up</button> {/* 회원가입 버튼 */}
          {/* 에러 메시지가 있을 경우 화면에 표시 */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default App2;
