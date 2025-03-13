import { create } from "zustand";

// Slider 데이터를 위한 인터페이스
export interface SilderProps {
  imgs: string[];
  name: string;
}

// 상태를 관리할 Props 인터페이스
export interface Props {
  Silder: SilderProps[];
}

// zustand를 사용한 상태 저장
export const useStore = create<Props>(() => ({
  Silder: [
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2025/01/26/08/38/heart-9360465_640.jpg",
      ],
      name: "1",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2023/01/30/14/50/women-7755902_640.png",
      ],
      name: "2",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_640.jpg",
      ],
      name: "3",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2023/11/17/01/50/pine-8393456_640.jpg",
      ],
      name: "4",
    },
  ],
}));
