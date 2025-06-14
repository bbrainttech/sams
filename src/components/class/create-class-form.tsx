import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "../../lib/axios";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Calendar } from "../ui/calendar";
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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CreateClassSchema = z.object({
  title: z.string().min(1),
  data: z.date().min(new Date()),
  description: z.string().optional(),
});

type CreateClassSchemaType = z.infer<typeof CreateClassSchema>;
export default function CreateClassForm() {
  const form = useForm<CreateClassSchemaType>({
    defaultValues: {
      title: "",
      data: new Date(),
      description: "",
    },
    resolver: zodResolver(CreateClassSchema),
  });

  const { mutate, isPending, isError } = useMutation<
    unknown,
    Error,
    { date: string; title: string; description?: string }
  >({
    mutationFn: (payload) => axios.post("/classes", payload),
    onSuccess: () => toast.success("Class created successfully!!"),
    onError: () => toast.error("Failed to create class"),
  });

  const onSubmit = async (data: CreateClassSchemaType) => {
    mutate({
      ...data,
      date: data.data.toISOString(),
    });
  };

  return (
    <section>
      <div className="font-medium my-3">Create a new class</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Class title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="data"
            control={form.control}
            render={({ field }) => (
              <FormItem className="justify-between flex items-center">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="(optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            variant={isError ? "destructive" : "default"}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : isError ? (
              "Try again"
            ) : (
              "Create class"
            )}
          </Button>
          <Link to={"/"} className={buttonVariants({ variant: "secondary" })}>
            &larr; Back home
          </Link>
        </form>
      </Form>
    </section>
  );
}
