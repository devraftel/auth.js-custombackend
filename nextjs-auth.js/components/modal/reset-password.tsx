"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useResetPassword } from "@/lib/hooks/use-reset-password";
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
import { recoverPassword } from "@/app/actions";

const PasswordRecoverySchema = z.object({
  email: z.string().email("Invalid email address"),
});

type PasswordRecoveryFormValues = z.infer<typeof PasswordRecoverySchema>;

export function ResetPassword() {
  const router = useRouter();
  const [result, dispatch] = useFormState(recoverPassword, undefined);
  const { isOpen, onClose, onOpen, onChange } = useResetPassword();
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
        onClose();
        router.push("/login");
      }
    }
  }, [result, router, onClose]);

  const onSubmit = async (data: PasswordRecoveryFormValues) => {
    startTransition(() => {
      dispatch(data.email);
    });
  };

  return (
    <Dialog onOpenChange={onChange} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          id="reset-password-trigger"
          variant="link"
          onClick={onOpen}
          className="text-neutral-700"
        >
          Ste pozabili geslo?
        </Button>
      </DialogTrigger>
      <DialogContent id="reset-password-trigger" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pridobi geslo</DialogTitle>
          <DialogDescription>
            Vpiši svoj email, da pridobiš svoje geslo.
          </DialogDescription>
        </DialogHeader>

        <section>
          <div className="mt-4 grid gap-6">
            <Form {...form}>
              <form
                id="reset-password-trigger"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email naslov</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      id="cancel-button"
                      type="button"
                      variant={"secondary"}
                      onClick={() => {
                        onClose();
                        form.reset();
                      }}
                      disabled={isPending}
                    >
                      Prekliči
                    </Button>

                    <Button
                      id="submit-button"
                      type="submit"
                      variant={"default"}
                      disabled={isPending}
                    >
                      {isPending ? "Pošiljam email z navodili..." : "Poslan email z navodili"}
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
