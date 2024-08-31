import React from "react";
import { auth } from "@/auth";
import { Header } from "@/components/header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const session = await auth();
  const isAdmin = session?.user?.isSuperuser || false;

  return (
    <div className="h-screen flex w-full max-h-full flex-col min-h-full">
      <div className="">

      <Header />
      </div>
<div className="h-5/6">
{children}

</div>
    </div>
  );
};

export default HomeLayout;
