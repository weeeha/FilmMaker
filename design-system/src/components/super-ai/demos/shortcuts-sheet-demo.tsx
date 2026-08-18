"use client";
import { Button } from "@/components/ui/button";
import { ShortcutsSheet } from "@/components/super-ai/shortcuts-sheet";
export default function ShortcutsSheetDemo() {
  return (
    <ShortcutsSheet
      trigger={<Button variant="outline">Keyboard Shortcuts</Button>}
      sections={[
        {
          title: "Editor",
          shortcuts: [
            { label: "Undo", keys: ["⌘", "Z"] },
            { label: "Redo", keys: ["⌘", "⇧", "Z"] },
          ],
        },
        { title: "Player", shortcuts: [{ label: "Play/Pause", keys: ["Space"] }] },
      ]}
    />
  );
}
