import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LogType } from "@/types";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ComponentProps = {
  children: ReactNode;
  log: LogType;
  onClose?: (status: boolean) => void;
};

export default function FormDialog({ children, log, onClose }: ComponentProps) {
  const { t } = useTranslation();
  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left rtl:text-right pt-6">
          <DialogTitle>
            {log ? t("Edit Worksheet") : t("New Worksheet")}
          </DialogTitle>
          <DialogDescription>
            {log
              ? t("Edit the worksheet for {{name}}", {
                  name: log.worker.fullName,
                })
              : t("Enter the details for the new worksheet")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              type="date"
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{log ? t("Save Changes") : t("Create")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
