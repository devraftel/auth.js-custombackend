import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PencilIcon } from "lucide-react";

import { cn, getUserInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChangePassword } from "@/components/modal/change-password";
import { DeleteAccount } from "@/components/modal/delete-account";
import { getCurrentUser } from "@/app/actions";

export default async function User() {
  const session = await auth();

  console.log("session", session);

  if (!session?.user) {
    console.log("Unauthorized user. Please login to continue.");

    redirect("/login");
  }

  const user = await getCurrentUser(session?.user?.accessToken as string);
  console.log("user", user);

  if (!user.data) {
    console.log("getCurrentUser Unauthorized user. Please login to continue.");
    redirect("/login");
  }

  return (
    <div className="container flex w-full items-center justify-center gap-8 px-2 py-12 sm:px-4 md:px-5">
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-4">
          <Avatar className="size-20">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>
              {getUserInitials(user?.data?.email)}
            </AvatarFallback>
          </Avatar>

          <Link
            href="/settings/edit"
            className={cn(
              buttonVariants({
                variant: "secondary",
                className: "mt-2 rounded-full",
                size: "icon",
              }),
            )}
          >
            <PencilIcon className="size-4" />
          </Link>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user?.data?.full_name || "not set"}
                placeholder={user?.data?.full_name || "not set"}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={user?.data?.email}
                id="email"
                type="email"
                readOnly
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <DeleteAccount />
          <ChangePassword />
        </div>

        <Separator />
      </div>
    </div>
  );
}
