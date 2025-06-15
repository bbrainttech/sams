import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "../../lib/axios";
import type { IClassResponse } from "../student/create-student-form";
import StudentItem from "../student/student-item";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface IStudent {
  _id: string;
  name: string;
  matricule: string;
}

export default function ClassList() {
  const {
    data: availableClassesData,
    isPending,
    isError,
  } = useQuery<{
    data: IClassResponse[];
  }>({
    queryKey: ["classes"],
    queryFn: () => axios.get("/classes"),
  });

  const availableClasses = availableClassesData?.data || [];

  const [currentClass, setCurrentClass] = useState<string>(
    availableClasses?.[0]?._id
  );

  const { data: classesData, isPending: isclassStudentsLoading } = useQuery<{
    data: {
      _id: string;
      name: string;
      class: string;
      matricule: string;
      present: boolean;
    }[];
  }>({
    queryKey: ["class-students", currentClass],
    queryFn: () => axios.get(`/classes/${currentClass}/students`),
    enabled: !!currentClass,
  });
  const studs = classesData?.data || [];

  console.log(studs);
  return (
    <section className=" mt-10 animate-in fade-in duration-300 grid gap-2">
      <div className="font-medium text-lg">Class list</div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({ variant: "secondary" })}
        >
          {currentClass
            ? availableClasses.find((st) => st._id === currentClass)?.title ||
              "class"
            : "Select class"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isPending ? (
            <div className="flex items-center gap-2 p-4">
              <Loader2 className="animate-spin" /> Loading classes
            </div>
          ) : isError ? (
            ""
          ) : (
            availableClasses?.map((cls) => (
              <DropdownMenuCheckboxItem
                onCheckedChange={() => setCurrentClass(cls._id)}
                key={cls?._id}
                checked={currentClass === cls?._id}
              >
                {cls.title}
              </DropdownMenuCheckboxItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {!currentClass ? (
        <div className="p-10 flex items-center gap-2 text-muted-foreground justify-center text-center">
          <span>Select a class to list its students</span>
        </div>
      ) : isclassStudentsLoading ? (
        <div className="p-10 flex items-center gap-2 text-muted-foreground justify-center text-center">
          <Loader2 className="animate-spin size-4" />
          <span>Loading students for this class</span>
        </div>
      ) : studs.length == 0 ? (
        <div className="text-center py-10  text-muted-foreground">
          <span>No students in this class</span>
        </div>
      ) : (
        studs.map((stud) => <StudentItem key={stud?._id} {...stud} />)
      )}
    </section>
  );
}
