"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { useDeleteUser } from "@/lib/hooks/use-delete-user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUser, signout } from "@/app/actions";

export function DeleteAccount() {
  const router = useRouter();
  const [result, dispatch] = useFormState(deleteUser, undefined);
  const { isOpen, onClose, onOpen, onChange } = useDeleteUser();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const logout = async () => {
      await signout();
    };

    if (result) {
      if (result.type === "error") {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        logout();
        router.push("/");
      }
    }
  }, [result, router]);

  return (
    <Dialog onOpenChange={onChange} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={"lg"}
          className="w-full"
          onClick={onOpen}
        >
          <TrashIcon className="mr-2 size-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center justify-between gap-4">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => {
                startTransition(() => {
                  dispatch();
                });
              }}
            >
              {isPending ? "Deleting..." : "Deleted"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
