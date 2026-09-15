"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "@/components/ui/Input";

export type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

/** An `Input` preconfigured for passwords: masked by default, with a show/hide toggle. */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      autoComplete={props.autoComplete || "current-password"}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="pointer-events-auto text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
