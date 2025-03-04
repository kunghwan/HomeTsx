import { FormEvent, useEffect, useRef, useState } from "react";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { v4 } from "uuid";

interface Props {
  payload?: Requirement;
  onCancel: () => void;
  onDone: (requiremet: Requirement) => void;
}

const RForm = ({ onCancel, onDone, payload }: Props) => {
  const [requirement, setRequirement] = useState<Requirement>(
    payload ?? {
      descs: [],
      title: "",
      id: v4(),
      status: "",
      manager: "",
    }
  );

  const [isInsertingDesc, setIsInsertingDesc] = useState<boolean>(false);

  const [desc, setDesc] = useState<string>("");

  const [directInserting, setDirectInserting] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const ManagerRef = useRef<HTMLSelectElement>(null);
  const ManagerRef2 = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInsertingDesc) {
      return;
    }

    if (requirement.title.length === 0) {
      alert("기능이름을 입력해주세요");
      return setTimeout(() => titleRef.current?.focus(), 100);
    }
    if (requirement.status.length === 0) {
      alert("진행상태 입력해주세요");
      return setTimeout(() => statusRef.current?.focus(), 100);
    }
    if (requirement.manager.length === 0) {
      if (directInserting) {
        alert("담당자를 입력해주세요");
        return setTimeout(() => ManagerRef2.current?.focus(), 100);
      }
      alert("담당자를 선택해주세요");
      return setTimeout(() => ManagerRef.current?.focus(), 100);
    }

    alert(payload ? "요구사항을 수정하세요" : "요구사항을 추가하세요");

    onDone(requirement);

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

    onCancel();
  };

  useEffect(() => {
    setTimeout(() => titleRef.current?.focus(), 100);
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="title">기능 이름</label>
        <input
          type="text"
          value={requirement.title}
          id="title"
          ref={titleRef}
          onChange={(e) =>
            setRequirement((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div>
        <label htmlFor="desc">상세내용</label>
        <ul>
          {requirement.descs.map((d, index) => (
            <div key={index}>
              {index + 1}. {d}
              <button
                type="button"
                onClick={() => {
                  const decs = [...requirement.descs];

                  decs.splice(index, 1);

                  setRequirement((prev) => ({ ...prev, descs }));
                }}
              >
                <FaRegTrashCan />
              </button>
            </div>
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
          type="button"
          onClick={() => {
            setIsInsertingDesc(true);
            setTimeout(() => descRef.current?.focus(), 100);
          }}
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default RForm;
