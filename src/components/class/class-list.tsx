import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";
import StudentItem from "../student/student-item";

export interface IStudent {
  _id: string;
  name: string;
  matricule: string;
}

export default function ClassList() {
  const { data } = useQuery<{ data: IStudent[] }>({
    queryKey: ["students"],
    queryFn: () => axios.get("/students"),
  });

  const students = data?.data || [];

  return (
    <section className=" mt-10 animate-in fade-in duration-300 grid gap-2">
      {students.map((stud) => (
        <StudentItem key={stud._id} {...stud} />
      ))}
    </section>
  );
}
