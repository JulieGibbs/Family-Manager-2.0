import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PayeeType } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import FormDialog from "./form-dialog";
import DeleteDialog from "@/components/component/delete-dialog";
import { MODERATOR } from "@/lib/constants";

const AvatarCombo = ({
  fallback,
  title,
  payee,
  deletePayee,
  userRole,
}: {
  fallback: React.ReactNode | string;
  title: string;
  payee: PayeeType;
  deletePayee: (id: string) => void;
  userRole: string | undefined;
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    deletePayee(payee.id);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="ltr:ml-4 rtl:mr-4 space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="space-x-3 rtl:space-x-reverse">
            <span>{title}</span>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-2 text-left rtl:text-right">
              <div className="flex space-x-5 rtl:space-x-reverse text-foreground">
                <p>{t("Email")}:</p>
                <a
                  aria-label="Email"
                  className="text-blue-500 text-md font-semibold"
                  href={`mailto:${payee.email}`}
                >
                  {payee.email}
                </a>
              </div>
              <div className="flex space-x-5 rtl:space-x-reverse text-foreground">
                <p>{t("Phone Number")}:</p>
                <a
                  style={{ direction: "ltr" }}
                  aria-label="Phone Number"
                  className="text-blue-500 text-md font-semibold"
                  href={`tel:${payee.phoneNumber}`}
                >
                  {payee.phoneNumber}
                </a>
              </div>
              <div className="flex space-x-5 rtl:space-x-reverse text-foreground">
                <p>{t("Remarks")}:</p>
                <p>{payee.remarks}</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
          <div className="flex flex-col gap-3 md:flex-row">
            <FormDialog
              payee={payee}
              onClose={(status) => {
                if (status == false) setOpen(false);
              }}
            >
              <Button>
                <Pencil2Icon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                <span>{t("Edit")}</span>
              </Button>
            </FormDialog>
            {userRole !== MODERATOR && (
              <DeleteDialog onAction={handleDelete}>
                <Button variant={"secondary"}>
                  <TrashIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                  <span>{t("Delete")}</span>
                </Button>
              </DeleteDialog>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvatarCombo;