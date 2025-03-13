import { people } from "./Afd"; // types.ts에서 import
import PersonCard from "../0313실험/PersonCard";

// PersonCard 컴포넌트 정의

const Person = () => {
  return (
    <div className="border p-2.5">
      <h1>People List</h1>
      <div>
        {people.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Person;
