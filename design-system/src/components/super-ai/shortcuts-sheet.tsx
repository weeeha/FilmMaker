"use client";

import * as React from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Kbd, KbdGroup } from "./kbd";

interface Shortcut {
  label: string;
  keys: string[];
}
interface ShortcutSection {
  title: string;
  shortcuts: Shortcut[];
}

interface ShortcutsSheetProps {
  sections: ShortcutSection[];
  title?: string;
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// Base UI adaptation: DialogTrigger uses `render` prop (not Radix `asChild`).
// We pass the user-supplied trigger element as the render target so Base UI
// merges its open-toggle handler onto that element.

function ShortcutsSheet({
  sections,
  title = "Keyboard Shortcuts",
  trigger,
  open,
  onOpenChange,
  className,
}: ShortcutsSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        data-slot="shortcuts-sheet"
        className={cn("flex max-h-[80vh] flex-col sm:max-w-md", className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 space-y-5 overflow-y-auto">
          {sections.map((section) => (
            <section key={section.title} data-slot="shortcuts-section" className="space-y-1">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul>
                {section.shortcuts.map((shortcut) => (
                  <li
                    key={shortcut.label}
                    data-slot="shortcuts-row"
                    className="flex items-center justify-between border-b py-2 text-sm last:border-0"
                  >
                    <span>{shortcut.label}</span>
                    <KbdGroup>
                      {shortcut.keys.map((key, i) => (
                        <Kbd key={`${i}-${key}`}>{key}</Kbd>
                      ))}
                    </KbdGroup>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ShortcutsSheet };
export type { Shortcut, ShortcutSection };
