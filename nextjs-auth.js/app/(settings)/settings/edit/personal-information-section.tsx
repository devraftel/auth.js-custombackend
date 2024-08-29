"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { UserResponse } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/app/actions";

const FormSchema = z.object({
  fullName: z.string().min(3).max(255),
  email: z.string().email(),
});

interface Props {
  user: UserResponse;
}

export const PersonalInformationSection = ({ user: data }: Props) => {
  const router = useRouter();
  const [result, dispatch] = useFormState(updateUser, undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: data.full_name || "",
      email: data.email,
    },
  });

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        form.reset();
        router.refresh();
      }
    }
  }, [result, router]);

  async function onSubmit(value: z.infer<typeof FormSchema>) {
    startTransition(() => {
      dispatch({
        email: value.email,
        full_name: value.fullName,
      });
    });
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="mt-4 grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder={"set a name"} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" readOnly {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button className="ml-auto" type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Saved"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
