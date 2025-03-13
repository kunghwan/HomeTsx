export interface Person {
  name: string;
  age: number;
  gender: boolean;
}

export type People = Person[];

export const people: People = [
  { name: "유경환", age: 10, gender: true },
  { name: "성웅", age: 20, gender: true },
  { name: "김범석", age: 40, gender: false },
];
