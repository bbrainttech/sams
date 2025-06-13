import { XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface ClassItemProps {
  present?: boolean;
  name: string;
  matricule: string;
}

export default function StudentItem({
  present,
  name,
  matricule,
}: ClassItemProps) {
  return (
    <li
      className={cn("border-l-4 p-2 bg-muted/80 list-none border-transparent", {
        "border-l-green-500": present,
      })}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{name}</span>
        <Button size={"icon"} variant={"ghost"} className="size-8 rounded-lg">
          <XIcon />
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
