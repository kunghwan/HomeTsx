import React from "react";
import { Person } from "./Afd";

const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div className="person-card">
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>Gender: {person.gender ? "Male" : "Female"}</p>
    </div>
  );
};

export default PersonCard;
