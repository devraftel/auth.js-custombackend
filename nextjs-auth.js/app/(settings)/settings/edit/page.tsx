import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/actions";

import { PersonalInformationSection } from "./personal-information-section";
import { SecuritySection } from "./security-section";

export default async function EditUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await getCurrentUser(session?.user?.accessToken);

  if (!user.data) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <main className="flex-1 py-8">
          <div className="container mx-auto grid gap-8">
            <PersonalInformationSection user={user.data} />
            <SecuritySection />
          </div>
        </main>
      </div>
    </>
  );
}

