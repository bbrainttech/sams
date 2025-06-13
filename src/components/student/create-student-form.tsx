import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "../../lib/axios";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const createStudent = async (payload: { name: string; matricule: string }) => {
  await axios.post("/students", payload);

  toast.success("Student created succesfully!!");
};

const CreateStudentSchema = z.object({
  name: z.string().min(1),
  present: z.boolean(),
  class: z.string().min(20),
  matricule: z.string().toLowerCase().min(8),
});

export type CreateStudentSchemaType = z.infer<typeof CreateStudentSchema>;
export default function CreateStudentForm() {
  const form = useForm<CreateStudentSchemaType>({
    defaultValues: {
      name: "",
      present: false,
      matricule: "",
    },
    resolver: zodResolver(CreateStudentSchema),
  });

  const onSubmit = async (data: CreateStudentSchemaType) => {
    await createStudent(data);
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
            name="class"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your class from the list" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cec430">CEC430</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
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
          <Button>Create student</Button>
        </form>
      </Form>
    </section>
  );
}
