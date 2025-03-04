import { useState } from "react";

const StudentApp = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      name: "유경환",
      moblie: "010-5877-2136",
    },
  ]);
  return <div>StudentApp</div>;
};

export default StudentApp;
