"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { softDeleteUser } from "@/services/user/userManagement";
import { IUser } from "@/types/user.interface";
import { toast } from "sonner";

const UserDeletionAlertModal = ({ open, setOpen, user }: any) => {
  // on user delete
  const handleUserDelete = async () => {
    try {
      const res = await softDeleteUser(user?.id);
      if (res?.success) {
        toast.success("User Deleted Successfully.");
      }
    } catch (err) {
      toast.error("Something Went Wrong while deleting user.");
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the user. Are you sure to delete?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUserDelete}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserDeletionAlertModal;
