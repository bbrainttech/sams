import { Loader2, XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

interface ClassItemProps {
  _id: string;
  present?: boolean;
  name: string;
  matricule: string;
}

export default function StudentItem({
  _id,
  present,
  name,
  matricule,
}: ClassItemProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.delete(`/students/${_id}`),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["students"] }),
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
        <Checkbox checked={present} />
        <span className="uppercase font-medium text-indigo-500">
          {matricule}
        </span>
      </div>
    </li>
  );
}
