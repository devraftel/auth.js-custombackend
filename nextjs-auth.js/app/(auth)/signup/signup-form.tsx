"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UserSignupRequest, UserSignupRequestSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconSpinner } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signup } from "@/app/actions";

import { GoogleAuthButton } from "./google-auth-button";

export default function SignupForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(signup, undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserSignupRequest>({
    resolver: zodResolver(UserSignupRequestSchema),
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(result.message);
        return;
      } else {
        toast.success(result.message);
        router.push("/login");
      }
    }
  }, [result, router]);

  function onSubmit(data: UserSignupRequest) {
    startTransition(() => dispatch(data));
  }
  return (
    <div className="flex flex-col space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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
                  <Input
                    placeholder="user@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="w-full" size={"lg"}>
            {isPending ? (
              <div className="flex items-center justify-center">
                <IconSpinner className="mr-2 size-4" />
                <p>Creating profile...</p>
              </div>
            ) : (
              "Create profile"
            )}
          </Button>
        </form>
      </Form>
      <Separator />
      <GoogleAuthButton />
      <div className="flex items-center justify-center">
        <Link
          href="/login"
          className="flex flex-row gap-1 text-sm text-zinc-400"
        >
          Already have an account?
          <div className="font-semibold underline">Log in</div>
        </Link>
      </div>
    </div>
  );
}
