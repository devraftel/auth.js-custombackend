"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useChangePassword } from "@/lib/hooks/use-change-password";
import { PasswordUpdateRequest } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        "Please enter the current password. It must be at least 8 characters long.",
      ),
    newPassword: z
      .string()
      .min(
        8,
        "Please enter the new password. It must be at least 8 characters long.",
      ),
    confirmPassword: z.string().min(8, "Please confirm the new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordChangeFormValues = z.infer<typeof PasswordChangeSchema>;

export function ChangePassword() {
  const router = useRouter();
  const [result, dispatch] = useFormState(updatePassword, undefined);
  const { isOpen, onClose, onOpen, onChange } = useChangePassword();
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
        onClose();
        router.refresh();
      }
    }
  }, [result, router, onClose]);

  const onSubmit = async (data: PasswordChangeFormValues) => {
    const payload = {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    } satisfies PasswordUpdateRequest;

    startTransition(() => dispatch(payload));
  };

  return (
    <Dialog onOpenChange={onChange} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"lg"}
          className="w-full"
          onClick={onOpen}
        >
          <LockKeyholeIcon className="mr-2 size-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            For increased security, please change your password. Use characters such as dots, numbers, lowercase and uppercase letters for better security.
          </DialogDescription>
        </DialogHeader>

        <section>
          <div className="mt-4 grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="current-password">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="current-password"
                          type="password"
                          {...field}
                        />
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
                        <Input
                          id="confirm-password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant={"secondary"}
                      onClick={() => {
                        onClose();
                        form.reset();
                      }}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant={"default"}
                      disabled={isPending}
                    >
                      {isPending ? "Changing..." : "Changed"}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
