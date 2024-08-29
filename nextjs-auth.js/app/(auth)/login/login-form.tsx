"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoginRequest, LoginRequestSchema } from "@/lib/schemas";
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
import { signin } from "@/app/actions";

import { GoogleAuthButton } from "../signup/google-auth-button";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    mutate,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signin,
    onSuccess(data, variables, context) {
      toast.success("Login successful");
      router.push("/");
    },
    onError(error, variables, context) {
      toast.error(error.message);
      return;
    },
  });

  function onSubmit(data: LoginRequest) {
    mutate(data);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
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
                    placeholder="Enter Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full" size={"lg"}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <IconSpinner className="mr-2 size-4" />
                <p>Loading</p>
              </div>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>
      <Separator />
      <GoogleAuthButton />
      <div className="flex w-full items-center justify-between">
        <Link
          href="/login/forgot-password"
          className="flex flex-row gap-1 text-sm text-neutral-700 hover:underline"
        >
          Forgot password?
        </Link>
        <Link
          href="/signup"
          className="flex flex-row gap-1 text-sm text-neutral-700"
        >
          Not registered? <div className="font-semibold underline">Sign up</div>
        </Link>
      </div>
    </div>
  );
}
