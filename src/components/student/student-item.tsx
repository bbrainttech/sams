import { Loader2, XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { toast } from "sonner";

interface ClassItemProps {
  _id: string;

  present: boolean;
  class: string;
  name: string;
  matricule: string;
}

export default function StudentItem({
  _id,
  present,
  name,
  class: cls,
  matricule,
}: ClassItemProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.delete(`/students/${_id}`),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["class-students", cls] }),
  });

  const { mutate: updateAtttendance } = useMutation<unknown, Error, boolean>({
    mutationFn: (p) =>
      axios.patch(
        `/classes/${cls}/attendance/${matricule}`,
        {
          present: p,
        },
        {
          params: {
            matricule,
            id: _id,
          },
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["class-students", cls] });
      toast.success("Student attendance updated");
    },
    onError: () => toast.error("Failed tp update student attendance"),
  });
  return (
    <li
      className={cn("border-l-4 p-2 bg-muted/80 list-none border-transparent", {
        "border-l-green-500": present,
      })}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{name}</span>
        <Button
          size={"icon"}
          disabled={isPending}
          onClick={() => mutate(undefined)}
          variant={"ghost"}
          className="size-8 rounded-lg"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <XIcon />}
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={present}
          onCheckedChange={(state) => {
            console.log(state);
            updateAtttendance(state === "indeterminate" ? true : state);
          }}
        />
        <span className="uppercase font-medium text-indigo-500">
          {matricule}
        </span>
      </div>
    </li>
  );
}
