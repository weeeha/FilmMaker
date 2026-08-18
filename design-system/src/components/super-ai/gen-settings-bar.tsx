"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const GenSettingsBarContext = React.createContext<{ disabled: boolean }>({ disabled: false });

interface GenSettingsBarProps extends React.ComponentProps<"div"> {
  disabled?: boolean;
}

function GenSettingsBar({ disabled = false, className, ...props }: GenSettingsBarProps) {
  return (
    <GenSettingsBarContext.Provider value={{ disabled }}>
      {/* TODO: arrow-key roving tabIndex (role=toolbar APG pattern; v1 ships Tab-per-item) */}
      <div
        role="toolbar"
        data-slot="gen-settings-bar"
        data-disabled={disabled || undefined}
        className={cn(
          "bg-muted/50 text-muted-foreground inline-flex items-center gap-0.5 rounded-md border p-0.5 text-xs",
          className,
        )}
        {...props}
      />
    </GenSettingsBarContext.Provider>
  );
}

function GenSettingsItem({ className, disabled, ...props }: React.ComponentProps<"button">) {
  const ctx = React.useContext(GenSettingsBarContext);
  return (
    <button
      type="button"
      data-slot="gen-settings-item"
      disabled={disabled ?? ctx.disabled}
      className={cn(
        "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none inline-flex items-center gap-1 rounded px-2 py-1 transition-colors disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { GenSettingsBar, GenSettingsItem };
