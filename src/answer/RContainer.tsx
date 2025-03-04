import { useState, useEffect } from "react";
import RForm from "./RForm"; // RForm 컴포넌트를 import
import RItem from "./RItem"; // RItem 컴포넌트를 import
import { dbService } from "../lib/firebase"; // Firebase 서비스에서 dbService를 import

const RContainer = () => {
  const [adding, setAdding] = useState<boolean>(false); // 요구사항 추가 상태 관리
  const [requirements, setRequirements] = useState<Requirement[]>([]); // 요구사항 리스트 상태 관리

  useEffect(() => {
    // Firebase에서 실시간 데이터 구독
    const subscribeReqirements = dbService
      .collection(collection) // Firebase의 'requirements' 컬렉션을 구독
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({ ...doc.data() })); // Firestore에서 문서를 가져와 데이터 형식으로 변환

        if (data.length === 0) {
          setTimeout(() => setAdding(true), 100); // 데이터가 없으면 요구사항 추가 폼을 표시
        }

        setRequirements((data as Requirement[]) ?? []); // 요구사항 데이터를 상태에 저장
      });

    subscribeReqirements; // 실시간 데이터 구독을 시작

    return subscribeReqirements; // 컴포넌트가 unmount되면 구독을 해제
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링 될 때만 실행

  return (
    <div>
      <header className="border-b-1 border-b-gray-200 flex justify-center relative h-15 items-center">
        <h1 className="text-2xl text-sky-500">요구사항 명세서 앱</h1>
        <button
          className="absolute right-2.5 top-2.5 p-2.5 rounded bg-gray-50 w-10 h-10 flex items-center justify-center text-2xl text-gray-500 cursor-pointer hover:bg-sky-500 hover:text-white"
          onClick={() => setAdding(true)} // 버튼 클릭 시 요구사항 추가 폼을 표시
        >
          +
        </button>
      </header>

      {adding && (
        <RForm
          onCancel={() => setAdding(false)} // 취소 시 폼을 닫음
          onDone={async (newRequirement) => {
            // 새로운 요구사항을 Firebase에 저장
            await dbService
              .collection(collection)
              .doc(newRequirement.id)
              .set(newRequirement);
            console.log("added");
          }}
        />
      )}

      {/* 요구사항 목록을 출력 */}
      <ul className="flex flex-col gap-y-2.5 p-5 max-w-225 mx-auto md:px-0">
        {requirements.map((payload) => (
          <RItem
            key={payload.id} // 각 요구사항 항목에 고유한 key를 부여
            payload={payload}
            onDelete={async (id) => {
              await dbService.collection(collection).doc(id).delete(); // 삭제 버튼 클릭 시 항목을 삭제
              alert("deleted");
            }}
            onEdit={async (newRequirement) => {
              await dbService
                .collection(collection)
                .doc(newRequirement.id)
                .set(newRequirement); // 수정된 요구사항을 Firebase에 저장
              console.log("updated");
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default RContainer;

const collection = "requirements"; // Firebase에서 사용하는 컬렉션 이름
