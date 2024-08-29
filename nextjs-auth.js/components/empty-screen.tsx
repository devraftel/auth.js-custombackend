"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

export function EmptyScreen({ email }: { email: string | null }) {
  return (
    <div className="mx-auto flex h-96 w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-md px-4">
      <div className="mb-2 flex flex-col space-y-2 sm:mb-4 md:mb-6">
        <h1 className="relative z-20 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl lg:text-5xl">
          Auth.js CustomB.C
        </h1>
        <p className="pointer-events-none max-w-3xl text-center text-base font-light text-zinc-800">
          {email ? email : ""}
        </p>
        <a
          href="https://github.com/devraftel"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: `flex items-center font-mono text-lg font-semibold text-purple-800`,
            }),
          )}
        >
          <GitHubLogoIcon width={"24"} height={"24"} className="mx-2" />
          <span className="mr-1">Get boilerplate code</span>
        </a>
      </div>
    </div>
  );
}
