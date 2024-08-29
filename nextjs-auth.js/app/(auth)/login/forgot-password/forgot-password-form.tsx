"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { recoverPassword } from "@/app/actions";

const PasswordRecoverySchema = z.object({
  email: z.string().email("Invalid email address"),
});

type PasswordRecoveryFormValues = z.infer<typeof PasswordRecoverySchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(recoverPassword, undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.push("/login");
      }
    }
  }, [result, router]);

  const onSubmit = async (data: PasswordRecoveryFormValues) => {
    startTransition(() => {
      dispatch(data.email);
    });
  };

  return (
    <section className="w-full">
      <div className="mt-4 grid gap-6">
        <Form {...form}>
          <form
            id="reset-password-trigger"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-sm space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-4">
              <Button
                id="submit-button"
                type="submit"
                variant={"default"}
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
