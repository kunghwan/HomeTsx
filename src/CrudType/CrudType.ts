// src/types/CrudType.ts

import { createContext, useContext } from "react";

// 데이터 아이템 타입
export interface Item {
  id: string; // Firestore 문서 ID
  name: string;
  description: string;
}

// 아이템 추가 시 필요한 타입
export interface CreateItemInput {
  name: string;
  description: string;
}

// 아이템 업데이트 시 필요한 타입
export interface UpdateItemInput {
  name?: string;
  description?: string;
}

// CRUD Context의 타입을 정의
export interface CrudContextType {
  items: Item[];
  addItem: (item: CreateItemInput) => Promise<void>;
  updateItem: (id: string, updatedData: UpdateItemInput) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItems: () => Promise<void>;
}

// createContext에 기본값을 설정
const defaultState: CrudContextType = {
  items: [],
  addItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
  getItems: async () => {},
};

// Context 생성
export const CrudContext = createContext<CrudContextType>(defaultState);

// useContext를 사용하는 커스텀 훅
export const useCrudContext = (): CrudContextType => useContext(CrudContext);
