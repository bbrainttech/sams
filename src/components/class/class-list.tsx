import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import StudentItem from "../student/student-item";

export interface IStudent {
  _id:string
  name:string
  matricule:string
}
const getStudents = async () => {
  const res = await axios.get("/students");
  return res.data;
};
export default function ClassList() {
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    (async () => {
      const studs = await getStudents();
      if (studs) {
        console.log({ studs });
        setStudents(studs);
      }
    })();
  }, []);
  return (
    <section className=" mt-10 animate-in fade-in duration-300 grid gap-2">
      {students.map((stud) => (
        <StudentItem key={stud._id} {...stud} />
      ))}
    </section>
  );
}
