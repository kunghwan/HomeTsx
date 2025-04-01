import { twMerge } from "tailwind-merge";
import { MY } from "../context";

const targets: MY.Target[] = [
  "기본정보",
  "비밀번호변경",
  "나의상품",
  "상품등록",
];

const MyTab = () => {
  const { changeTarget, target } = MY.store();

  return (
    <aside className="border-r border-gray-200 p-2 ">
      <ul className="flex flex-col gap-y-2.5 ">
        {targets.map((item) => {
          return (
            <li
              key={item}
              className={twMerge(
                "w-full items-start hover:shadow-none cursor-pointer ",
                target === item && "text-theme"
              )}
              onClick={() => changeTarget(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
export default MyTab;
