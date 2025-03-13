// Person 타입 정의
export interface Person {
  name: string;
  age: number;
  gender: boolean;
}

// People 타입은 Person 객체들의 배열
export type People = Person[];

// People 데이터를 별도로 관리 (여기서 데이터 분리)
export const people: People = [
  { name: "dsfsdf", age: 10, gender: false },
  { name: "dsfsdsfdf", age: 20, gender: true },
  { name: "dsfsdf", age: 30, gender: false },
];
