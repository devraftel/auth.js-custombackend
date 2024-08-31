import { auth } from "@/auth";

import { Session } from "@/lib/types";
import { EmptyScreen } from "@/components/empty-screen";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
  const session = (await auth()) as Session;

  return (
    <div className="group w-full  overflow-auto pl-0 text-neutral-950 peer-[[data-state=closed]]:group-[]:pl-[72px] dark:text-neutral-50 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <EmptyScreen email={session ? session.user.email : ""} />
    
    </div>
  );
}
