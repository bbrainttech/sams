import { useQuery } from "@tanstack/react-query";
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

  const { data: classesData } = useQuery<{
    data: {
      _id: string;
      name: string;
      matricule: string;
      present: boolean;
    }[];
  }>({
    queryKey: ["class-students", currentClass],
    queryFn: () => axios.get(`/classes/${currentClass}/students`),
    enabled: !!currentClass,
  });
  const studs = classesData?.data || [];

  return (
    <section className=" mt-10 animate-in fade-in duration-300 grid gap-2">
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
          {isPending
            ? "Loading classes"
            : isError
            ? ""
            : availableClasses?.map((cls) => (
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => setCurrentClass(cls._id)}
                  key={cls?._id}
                  checked={currentClass === cls?._id}
                >
                  {cls.title}
                </DropdownMenuCheckboxItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {studs.map((stud) => (
        <StudentItem key={stud?._id} {...stud} />
      ))}
    </section>
  );
}
