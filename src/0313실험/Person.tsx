import { useState } from "react";
import { people } from "./Afd";
import PersonCard from "./PersonCard";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

const Person = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <h1>personlist</h1>
      <button onClick={() => document.body.classList.toggle("dark")}>
        {darkMode ? <IoMoon /> : <IoSunnySharp />}
      </button>
      <div className="border p-2.5 flex flex-col gap-y-2.5">
        {people.map((p, i) => (
          <PersonCard key={i} person={p} />
        ))}
      </div>
    </div>
  );
};

export default Person;
