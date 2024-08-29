"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordUpdateRequest } from "@/lib/schemas";
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
import { updatePassword } from "@/app/actions";

const PasswordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(
        8,
        "Vpiši trenutno geslo (dolgo je vsaj 8 znakov)",
      ),
    newPassword: z
      .string()
      .min(
        8,
        "Vpiši novo geslo. Dolgo naj bo vsaj 8 znakov in naj vključuje številke in znake kot je _",
      ),
    confirmPassword: z.string().min(8, "Potrdi svoje novo geslo"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Gesli se ne ujemata",
    path: ["confirmPassword"],
  });

type PasswordChangeFormValues = z.infer<typeof PasswordChangeSchema>;

export const SecuritySection = () => {
  const router = useRouter();
  const [result, dispatch] = useFormState(updatePassword, undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
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

  const onSubmit = async (data: PasswordChangeFormValues) => {
    const payload = {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    } satisfies PasswordUpdateRequest;
    startTransition(() => dispatch(payload));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">Security</h2>
      <div className="mt-4 grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="current-password">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input id="current-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="new-password">New Password</FormLabel>
                  <FormControl>
                    <Input id="new-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm-password">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input id="confirm-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving password..." : "Save password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
