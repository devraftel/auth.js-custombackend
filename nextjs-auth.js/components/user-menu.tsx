"use client";

import Link from "next/link";
import { LayoutDashboard, Settings } from "lucide-react";

import { useSidebar } from "@/lib/hooks/use-sidebar";
import { type Session } from "@/lib/types";
import { getUserInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "@/app/actions";

export interface UserMenuProps {
  user: Session["user"];
  isAdmin: boolean;
}

export function UserMenu({ user, isAdmin }: UserMenuProps) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(user.email)}
            </div>
            {isSidebarOpen && (
              <span className="ml-2 hidden md:block">{user.email}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          {isAdmin && (
            <DropdownMenuItem>
              <Link href="" className="flex items-center space-x-2.5">
                <LayoutDashboard className="size-4" />
                <p className="text-sm">You are Admin</p>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href="/settings" className="flex items-center space-x-2.5">
              <Settings className="size-4" />
              <p className="text-sm">Settings</p>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <form action={signout}>
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Log Out
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
