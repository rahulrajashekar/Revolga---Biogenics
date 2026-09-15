"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogCloseButton, DialogFooter } from "@/components/ui/Dialog";
import { Button, ButtonProps } from "@/components/ui/Button";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmVariant?: ButtonProps["variant"];
  isLoading?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "destructive",
  isLoading,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </div>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
