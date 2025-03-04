import { useState, useEffect, useRef, FormEvent } from "react";
import { v4 } from "uuid";
import { FaRegTrashCan, FaRotate, FaPlus } from "react-icons/fa6";

interface Props {
  payload?: Requirement;

  onCancel: () => void;

  onDone: (requirement: Requirement) => void;
}

const RForm = ({ onCancel, onDone, payload }: Props) => {
  const [requirement, setRequirement] = useState<Requirement>(
    payload ?? {
      descs: [], // 초기 descs 값은 빈 배열로 설정
      id: v4(), // uuid를 사용하여 고유 ID 생성
      manager: "", // 담당자 초기값
      status: "", // 상태 초기값
      title: "", // 제목 초기값
    }
  );

  const [isInsertingDesc, setIsInsertingDesc] = useState<boolean>(false); // 현재 상세 내용 입력 중인지 확인하는 상태

  const [desc, setDesc] = useState<string>(""); // 상세 내용 입력 상태

  const [directInserting, setDirectInserting] = useState<boolean>(false); // 직접 입력 모드 여부 상태

  const titleRef = useRef<HTMLInputElement>(null); // 제목 input의 ref
  const descRef = useRef<HTMLInputElement>(null); // 상세 내용 input의 ref
  const statusRef = useRef<HTMLSelectElement>(null); // 상태 select의 ref
  const managerRef = useRef<HTMLSelectElement>(null); // 담당자 select의 ref
  const managerRef2 = useRef<HTMLInputElement>(null); // 담당자 직접 입력의 ref

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInsertingDesc) {
      return; // 상세 내용 입력 중이라면 제출하지 않음
    }

    // 제목이 비어 있으면 알림 후 제목 입력 필드로 포커스 이동
    if (requirement.title.length === 0) {
      alert("기능 이름을 적어주세요.");
      return setTimeout(() => titleRef.current?.focus(), 100);
    }

    // 상태가 선택되지 않았으면 알림 후 상태 선택 필드로 포커스 이동
    if (requirement.status.length === 0) {
      alert("진행상태를 선택해주세요.");
      return setTimeout(() => statusRef.current?.showPicker());
    }

    // 담당자가 비어 있으면 알림 후 담당자 선택 필드로 포커스 이동
    if (requirement.manager.length === 0) {
      if (directInserting) {
        alert("담당자를 입력해주세요.");
        return setTimeout(() => managerRef2.current?.focus(), 100);
      }

      alert("담당자를 선택해주세요.");
      return setTimeout(() => managerRef.current?.showPicker(), 100);
    }

    // 추가 또는 수정 후 알림
    alert(payload ? "요구사항을 수정했습니다." : "요구사항을 추가했습니다.");

    // 요구사항 완료 후 onDone 호출
    onDone(requirement);

    // 새로 추가하는 경우 초기화 후 제목 필드로 포커스 이동
    if (!payload) {
      setRequirement({
        descs: [],
        id: v4(),
        manager: "",
        status: "",
        title: "",
      });

      setTimeout(() => titleRef.current?.focus(), 100);
      return;
    }

    // 수정 후 onCancel 호출
    onCancel();
  };

  // 최초 렌더링 시 제목 필드로 포커스 이동
  useEffect(
    () => {
      setTimeout(() => titleRef.current?.focus(), 100);
    },
    [] // 빈배열 -> 최초 렌더링 시 한 번만 실행
  );

  return (
    <form
      className="flex flex-col gap-y-2.5 max-w-225 mx-auto p-5 md:px-0"
      onSubmit={onSubmit}
    >
      <div className={div}>
        <label htmlFor="title" className={label}>
          기능 이름
        </label>
        <input
          ref={titleRef}
          type="text"
          value={requirement.title}
          id="title"
          className={input}
          onChange={
            (e) =>
              setRequirement((prev) => ({ ...prev, title: e.target.value })) // 제목 변경 시 상태 업데이트
          }
        />
      </div>

      <div className={div}>
        <label htmlFor="desc" className={label}>
          상세내용
        </label>

        <ul className="flex flex-col gap-y-1 px-2">
          {requirement.descs.map((d, index) => (
            <li key={index} className="flex">
              <div className="text-xs bg-gray-50 rounded p-1 text-gray-700 hover:shadow-md flex gap-x-2">
                {index + 1}. {d}
                <button
                  type="button"
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => {
                    const descs = [...requirement.descs];

                    descs.splice(index, 1); // 해당 상세 내용 삭제

                    setRequirement((prev) => ({ ...prev, descs })); // 상태 업데이트
                  }}
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isInsertingDesc && (
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} // 상세 내용 입력 시 상태 업데이트
            ref={descRef}
            className={input}
            onFocus={() => setIsInsertingDesc(true)} // 포커스 시 입력 시작
            onBlur={() => setIsInsertingDesc(false)} // 포커스 아웃 시 입력 종료
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (desc.length === 0) {
                  alert("상세 내용을 입력해주세요.");
                  return setTimeout(() => descRef.current?.focus(), 100); // 내용이 비어있으면 포커스 이동
                }

                if (e.nativeEvent.isComposing) {
                  return;
                }
                setRequirement((prev) => ({
                  ...prev,
                  descs: [...prev.descs, desc], // 새로운 상세 내용 추가
                }));
                setDesc(""); // 입력 필드 초기화
                setTimeout(() => descRef.current?.focus(), 100); // 입력 필드로 포커스 이동
              } else if (e.key === "Tab") {
                setIsInsertingDesc(false); // 탭 키로 입력 종료
                setTimeout(() => statusRef.current?.showPicker(), 100); // 상태 선택 필드로 포커스 이동
              }
            }}
          />
        )}

        <button
          className="w-full rounded bg-gray-50 flex justify-center h-10 items-center hover:opacity-80 active:opacity-50 hover:bg-gray-100 cursor-pointer"
          type="button"
          onClick={() => {
            setIsInsertingDesc(true); // 상세 내용 입력 시작
            setTimeout(() => descRef.current?.focus(), 100); // 입력 필드로 포커스 이동
          }}
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex gap-x-2.5 items-end">
        <div className="flex gap-x-2.5 flex-2">
          <div className={div}>
            <label htmlFor="status" className={label}>
              진행상태
            </label>
            <select
              ref={statusRef}
              id="status"
              value={requirement.status}
              className={select}
              onChange={(e) => {
                setRequirement((prev) => ({
                  ...prev,
                  status: e.target.value as RequirementStatus, // 상태 변경 시 상태 업데이트
                }));
                setTimeout(() => {
                  if (directInserting) {
                    return managerRef2.current?.focus(); // 직접 입력 모드일 경우 담당자 입력 필드로 포커스 이동
                  }
                  managerRef.current?.showPicker(); // 담당자 선택 필드로 포커스 이동
                }, 100);
              }}
            >
              <option>선택</option>

              {statuses.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            {!directInserting ? (
              <div className={div}>
                <label htmlFor="manager1" className={label}>
                  담당자
                </label>
                <select
                  ref={managerRef}
                  id="manager1"
                  value={requirement.manager}
                  className={select}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value === "직접 입력") {
                      setRequirement((prev) => ({ ...prev, manager: "" })); // 담당자 필드 초기화
                      setDirectInserting(true); // 직접 입력 모드로 변경
                      return setTimeout(
                        () => managerRef2.current?.focus(),
                        100
                      );
                    }
                    setRequirement((prev) => ({
                      ...prev,
                      manager: value as RequirementManager, // 담당자 선택 시 상태 업데이트
                    }));
                  }}
                >
                  <option>선택</option>
                  <option value="직접 입력">직접 입력</option>

                  {managers.map((manager) => (
                    <option key={manager} value={manager}>
                      {manager}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex gap-x-2.5 items-end">
                <div className={div.concat(" flex-1")}>
                  <label htmlFor="manager2" className={label}>
                    직접 입력
                  </label>
                  <input
                    type="text"
                    id="manager2"
                    value={requirement.manager}
                    className={input}
                    ref={managerRef2}
                  />
                </div>
                <button
                  type="button"
                  className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-gray-500 hover:opacity-80 hover:bg-gray-100 active:opacity-50 cursor-pointer"
                  onClick={() => {
                    setRequirement((prev) => ({ ...prev, manager: "" })); // 담당자 필드 초기화
                    setDirectInserting(false); // 직접 입력 모드 종료
                    setTimeout(() => managerRef.current?.showPicker(), 100); // 담당자 선택 필드로 포커스 이동
                  }}
                >
                  <FaRotate />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-x-2.5 flex-1">
          <button className="rounded bg-sky-500 h-10 px-2.5 text-white hover:opacity-80 active:opactiy-50 cursor-pointer flex-3">
            {payload ? "수정" : "추가"} {/* 추가 또는 수정 버튼 표시 */}
          </button>
          <button
            type="button"
            className="rounded bg-gray-50 px-2.5 hover:opacity-80 active:opacity-50 cursor-pointer hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
};

export default RForm;

const div = "flex flex-col gap-y-1";
const label = "text-xs text-gray-500";
const input =
  "rounded outline-none bg-gray-100 focus:bg-gray-50 focus:border focus:border-blue-500 h-10 px-2.5";
const select = input.concat(" pl-0");

const statuses: RequirementStatus[] = ["계획중", "진행중", "완료"];
const managers: RequirementManager[] = [
  "강산",
  "강찬희",
  "김영화",
  "유경환",
  "허승이",
];
