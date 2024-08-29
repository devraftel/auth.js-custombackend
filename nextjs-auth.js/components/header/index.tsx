import * as React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Session } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SidebarMobile } from "@/components/sidebar-mobile";
import { SidebarToggleClient } from "@/components/sidebar-toggle-client";
import { UserMenu } from "@/components/user-menu";

import { SidebarList } from "../sidebar-list";
import { Navigation } from "./navigation";

async function UserOrLogin() {
  const session = await auth();
  const isAdmin = session?.user?.isSuperuser || false;

  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>{session.user.id}</SidebarMobile>
          <SidebarToggleClient />
        </>
      ) : (
        <Link href="/" rel="nofollow" className="mr-2">
          <GitHubLogoIcon width={"20"} height={"20"} />
        </Link>
      )}
      <div className="flex items-center">
        {session?.user ? (
          <UserMenu user={session.user as Session["user"]} isAdmin={isAdmin} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}

export async function Header() {
  const session = await auth();
  const isAdmin = session?.user?.isSuperuser || false;

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-white p-4 dark:bg-neutral-950 lg:hidden">
        <Logo />
        <SidebarMobile>
          <SidebarList
            isAdmin={isAdmin}
            session={session as Session}
          />
        </SidebarMobile>
      </div>
      <header className="sticky top-0 z-50 hidden h-16 w-full shrink-0 items-center justify-between border-b bg-slate-50 bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl lg:flex">
        <div className="flex items-center space-x-2">
          <Logo />
          <h1 className="hidden text-lg font-bold tracking-tight text-purple-800 md:block">
            DevRaftel
          </h1>
        </div>
        <Navigation isSignedIn={session?.user ? true : false} />
        <div className="flex items-center">
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <UserOrLogin />
          </React.Suspense>
        </div>
      </header>
    </>
  );
}
