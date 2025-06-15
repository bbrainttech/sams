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
export default function ClassReportPage() {
  const { id } = useParams();
  const { data, isPending } = useQuery<{ data: IStudentReport }>({
    queryKey: ["report", id],
    queryFn: () => axios.get(`/classes/${id}`),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <div>
        <Loader2 className="animate-spin" />
        <span>Loading student report</span>
      </div>
    );
  }

  const report = data?.data;
  console.log(report);

  if (!report)
    return (
      <div className="max-w-sm space-y-3 mx-auto flex flex-col text-center">
        <p className="font-bold text-lg">No Class report</p>
        <Link to={"/"} className={buttonVariants({ variant: "secondary" })}>
          &larr; Go back
        </Link>
      </div>
    );

  // const attendance = report?.classes.map((cls) => {
  //   const match = Object.entries(report.attendance).find(
  //     ([key, _]) => key === cls._id
  //   );

  //   return {
  //     ...cls,
  //     match: match?.[1],
  //   };
  // });
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
        <span className="text-muted-foreground">Class attendance</span>
        <div className="divide-y [&>div]:py-2.5">
          {/* {JSON.stringify(report?.classes)} */}

          {report?.classes.map((cls) => (
            <div>
              <span className="mb-2">{cls.title} : </span>
              <div className="!mt-3">
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
