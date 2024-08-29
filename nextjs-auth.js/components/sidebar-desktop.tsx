import { auth } from "@/auth";

import { Session } from "@/lib/types";
import { Sidebar } from "@/components/sidebar";
import { SidebarList } from "@/components/sidebar-list";

export const dynamic = "force-dynamic";

export async function SidebarDesktop() {
  const session = await auth();
  const isAdmin = session?.user?.isSuperuser || false;

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden translate-x-0 border-r duration-300 ease-in-out data-[state=closed]:w-[72px] data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <SidebarList isAdmin={isAdmin} session={session as Session} />
    </Sidebar>
  );
}
