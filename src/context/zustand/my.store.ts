import { create } from "zustand";

export interface Props {
  target: Target;
  changeTarget: PropsFunc<Target>;
}

export type Target = "기본정보" | "비밀번호 변경" | "상품등록" | "나의 상품";

export const store = create<Props>((set) => ({
  target: "기본정보",
  changeTarget: (newTarget) => set((prev) => ({ ...prev, target: newTarget })),
}));
