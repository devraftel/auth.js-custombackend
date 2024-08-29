"use client";

import { useEffect, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
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
import { resetPassword } from "@/app/actions";

const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    newPassword: z
      .string()
      .min(8, "New password should be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();
  const [result, dispatch] = useFormState(resetPassword, undefined);
  const [isPending, startTransition] = useTransition();

  if (token.length <= 0) {
    redirect("/login");
  }

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token,
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
        router.push("/login");
      }
    }
  }, [result, router]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const payload = {
      token: data.token,
      new_password: data.newPassword,
    };
    startTransition(() => dispatch(payload));
  };

  return (
    <section className="w-full max-w-md">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-semibold">Ponastavi geslo</h2>
        <p>
          Ponastavi svoje geslo. Dolžina naj bo vsaj 8 znakov in naj vključuje znake številke, črke, _
        </p>
      </div>
      <div className="mt-4 grid gap-6">
        <Form {...form}>
          <form
            id="reset-password-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="new-password">Novo geslo</FormLabel>
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
                    Potrdi geslo
                  </FormLabel>
                  <FormControl>
                    <Input id="confirm-password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button id="submit-button" type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
