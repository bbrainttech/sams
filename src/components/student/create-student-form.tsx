import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "../../lib/axios";
import { Button, buttonVariants } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";

const CreateStudentSchema = z.object({
  name: z.string().min(1),
  present: z.boolean(),
  classes: z.array(z.string()).min(1, "Please select at least one class"),
  matricule: z.string().toLowerCase().min(8),
});

export interface IClassResponse {
  _id: string;
  title: string;
  description?: string;
}
export type CreateStudentSchemaType = z.infer<typeof CreateStudentSchema>;
export default function CreateStudentForm() {
  const form = useForm<CreateStudentSchemaType>({
    defaultValues: {
      name: "",
      present: false,
      matricule: "",
      classes: [],
    },
    resolver: zodResolver(CreateStudentSchema),
  });

  const { data } = useQuery<{
    data: IClassResponse[];
  }>({
    queryKey: ["classes"],
    queryFn: () => axios.get("/classes"),
  });

  const classes = data?.data || [];

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation<
    unknown,
    Error,
    CreateStudentSchemaType
  >({
    mutationFn: (payload) => axios.post("/students", payload),
    onSuccess: async () => {
      toast.success("Student created succesfully!!");

      console.log(
        form.getValues("classes").map((cls) => ["class-students", cls])
      );
      form.getValues("classes").map(
        async (cls) =>
          await queryClient.invalidateQueries({
            queryKey: ["class-students", cls],
          })
      );
    },
    onError: () => toast.error("Failed to created student!!"),
  });

  const onSubmit = async (data: CreateStudentSchemaType) => {
    const attendance = data.classes.reduce((acc, id) => {
      acc[id] = { present: data.present };
      return acc;
    }, {} as { [k: string]: { present: boolean } });

    const payload = {
      ...data,
      attendance,
    };
    mutate(payload);
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-5 duration-300 zoom-in-95">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            name="matricule"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matriculation</FormLabel>
                <FormControl>
                  <Input placeholder="your matricule" {...field} />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="classes"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="justify-between items-center flex">
                  <Popover>
                    <PopoverTrigger
                      role="combobox"
                      className={buttonVariants({
                        size: "sm",
                        variant: "outline",
                        className:
                          "w-full " +
                          (classes.length < 1 ? " text-muted-foreground" : ""),
                      })}
                    >
                      <span>
                        {field.value.length > 0
                          ? field.value.length + " selected"
                          : "Select your classes"}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      className="w-[28rem] max-w-full p-0 "
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search claesses"
                          className="h-9"
                        />
                        <CommandList small-scroll-bar="">
                          <CommandEmpty className="flex flex-col gap-3 justify-center text-center p-4">
                            <span className="text-muted-foreground">
                              No class found.
                            </span>
                            <Link
                              to={"/class"}
                              className={buttonVariants({
                                variant: "secondary",
                              })}
                            >
                              Create a class
                            </Link>
                          </CommandEmpty>
                          <CommandGroup>
                            {classes.map(({ _id, title }) => {
                              return (
                                <CommandItem
                                  key={_id}
                                  value={_id}
                                  onSelect={() => {
                                    const selected = !field.value.includes(_id)
                                      ? [...field.value, _id]
                                      : field.value.filter((id) => id !== _id);

                                    field.onChange(selected);
                                  }}
                                  className="group/cmd-item text-sm capitalize"
                                >
                                  <Checkbox
                                    checked={field.value.includes(_id)}
                                  />

                                  <span className="capitalize">{title}</span>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              );
            }}
          />

          <FormField
            name="present"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-5 justify-between">
                <FormLabel className="text-lg">In class?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={isError ? "destructive" : "default"}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create student"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
