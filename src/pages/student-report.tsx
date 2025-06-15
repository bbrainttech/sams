import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { IStudent } from "../components/class/class-list";
import StudentItem from "../components/student/student-item";
import { buttonVariants } from "../components/ui/button";
import axios from "../lib/axios";

type ReportClass = IClass & {
  attendance: { present: boolean };
};
interface IStudentReport {
  _id: string;
  name: string;
  matricule: string;
  classes: ReportClass[];
  attendance: Attendance;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Attendance = {
  [cls: string]: {
    present: boolean;
    _id: string;
  };
};

interface IClass {
  _id: string;
  title: string;
  date: string;
  description: string;
  students: IStudent[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function StudentReportPage() {
  const { id } = useParams();

  const { data, isPending } = useQuery<{ data: IStudentReport }>({
    queryKey: ["report", id],
    queryFn: () => axios.get(`/students/${id}`),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <div className="mx-auto max-w-fit flex items-center flex-col gap-4">
        <Loader2 className="animate-spin size-9" />
        <span>Loading student report</span>
      </div>
    );
  }

  const report = data?.data;

  if (!report)
    return (
      <div className="max-w-sm space-y-3 mx-auto flex flex-col text-center">
        <p className="font-bold text-lg">No student report</p>
        <Link to={"/"} className={buttonVariants({ variant: "secondary" })}>
          &larr; Go back
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-md flex flex-col">
      <h1 className="text-muted-foreground">Student</h1>
      <div className="divide-y [&>div]:py-2.5">
        <div>
          <span>Name: </span>
          <span className="font-medium capitalize">{report?.name}</span>
        </div>
        <div>
          <span>Matricule: </span>
          <span className="font-medium uppercase">{report?.matricule}</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Class attendance</span>
          <div className="flex items-center gap-x-2">
            <span>Presence:</span>
            <span>
              {
                report.classes
                  .filter((c) => c.attendance.present)
                  .flatMap((cls) => cls.students.length).length
              }
            </span>
          </div>
        </div>
        <div className="divide-y [&>div]:py-2.5">
          {report?.classes.map((cls) => (
            <div>
              {cls.title} :{" "}
              {cls.students
                .filter((student) => student._id === id)
                .map((std) => (
                  <StudentItem
                    key={std._id}
                    present={cls.attendance.present}
                    class={cls._id}
                    {...std}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
      <Link to={"/"} className={buttonVariants({ variant: "secondary" })}>
        &larr; Go back
      </Link>
    </div>
  );
}
