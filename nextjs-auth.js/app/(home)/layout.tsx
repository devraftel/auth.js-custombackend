import React from "react";
import { auth } from "@/auth";

import { Session } from "@/lib/types";
import { Logo } from "@/components/Logo";
import { SidebarDesktop } from "@/components/sidebar-desktop";
import { SidebarList } from "@/components/sidebar-list";
import { SidebarMobile } from "@/components/sidebar-mobile";


interface HomeLayoutProps {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const session = await auth();
  const isAdmin = session?.user?.isSuperuser || false;

  return (
    <>
      <div className="relative flex h-screen flex-col overflow-hidden lg:flex-row">
        <div className="flex h-16 items-center justify-between bg-white p-4 dark:bg-neutral-950 lg:hidden">
          <Logo />
          <SidebarMobile>
            <SidebarList
              isAdmin={isAdmin}
              session={session as Session}
            />
          </SidebarMobile>
        </div>
        <SidebarDesktop />
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
