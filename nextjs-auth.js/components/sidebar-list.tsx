"use client";

import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { InfoIcon, LogInIcon } from "lucide-react";

import { useSidebar } from "@/lib/hooks/use-sidebar";
import { Session } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

import { SidebarToggle } from "./sidebar-toggle";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { UserMenu } from "./user-menu";

export const dynamic = "force-dynamic";

interface SidebarListProps {
  userId?: string;
  session: Session | null;
  isAdmin: boolean;
}

export function SidebarList({ userId, session, isAdmin }: SidebarListProps) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-8 p-4">
          {/* Logo */}
          {isSidebarOpen ? (
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
              <div className="flex flex-col items-center">
                <Logo width={220} className="pb-0 pl-0 pt-0" />
                <h1 className="text-lg font-bold tracking-wider text-purple-800 md:mt-0">
                  <Link href="https://github.com/devraftel">
                    Auth.jsCustom B.C
                  </Link>
                </h1>
              </div>
              <SidebarToggle />
            </div>
          ) : (
            <Logo className="pb-0 pl-0 pt-0" />
          )}

          {/* Menu */}
          <nav className="text-neutral-950 dark:text-neutral-50">
            <div className="flex flex-col gap-4">
              <Separator />

              {!session && isSidebarOpen && (
                <div className="rounded-md bg-neutral-100 dark:bg-neutral-900">
                  <Link
                    href={"/login"}
                    className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-[1rem]"
                  >
                    <InfoIcon className="flex size-5 shrink-0" />
                    {isSidebarOpen && (
                      <span className="text-[0.875rem]">
                        Identify yourself
                        <span className="font-bold text-purple-800 group-hover:underline group-hover:underline-offset-2 dark:text-emerald-300">
                          &nbsp;Login{" "}
                        </span>
                      </span>
                    )}
                  </Link>
                </div>
              )}

              {!session && !isSidebarOpen && (
                <Tooltip>
                  <Link
                    href={"/login"}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[1.125rem] hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <TooltipTrigger asChild>
                      <LogInIcon className="size-5" />
                    </TooltipTrigger>
                    {!isSidebarOpen && (
                      <TooltipContent side="left">
                        <span>Identify yourself</span>
                      </TooltipContent>
                    )}
                    {isSidebarOpen && <span>Login</span>}
                  </Link>
                </Tooltip>
              )}
              <a
                href="https://github.com/devraftel"
                className={
                  "flex items-center px-1 font-mono text-lg font-semibold text-purple-800 underline"
                }
              >
                <GitHubLogoIcon width={"20"} height={"20"} className="mr-1" />
                {isSidebarOpen && <span className="mr-1">GitHub Repo</span>}
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-center">
        <Separator />

        <div className="w-full p-4">
          {isSidebarOpen && !session && (
            <Link href={"/login"} className="w-full">
              <Button className="mt-8 w-full rounded-full text-[1.125rem]">
                Login
              </Button>
            </Link>
          )}
          <Tooltip>
            {!isSidebarOpen && (
              <TooltipTrigger asChild>
                <div className="px-2">
                  <SidebarToggle />
                </div>
              </TooltipTrigger>
            )}
            <TooltipContent side="left">
              <span>Open left menu</span>
            </TooltipContent>
          </Tooltip>
          {session?.user && (
            <UserMenu
              isAdmin={isAdmin}
              user={session?.user as Session["user"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
