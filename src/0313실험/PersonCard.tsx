import { Person } from "./Afd";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div className="dark:bg-black border">
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>Gender: {person.gender ? "Male" : "Female"}</p>
      <div>
        <button className="buttonst">삭제</button>
        <button className="bg-bg">수정</button>
      </div>
    </div>
  );
};

export default PersonCard;
