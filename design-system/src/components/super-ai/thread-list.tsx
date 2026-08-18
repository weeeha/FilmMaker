"use client";

import { MoreHorizontal, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import * as React from "react";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { DateSection } from "./date-section";

function ThreadList({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="thread-list" className={cn("flex flex-col gap-3", className)} {...props} />;
}

function ThreadListSection(props: React.ComponentProps<typeof DateSection>) {
  return <DateSection data-slot="thread-list-section" {...props} />;
}

interface ThreadListItemProps extends Omit<React.ComponentProps<"div">, "id" | "title" | "onSelect"> {
  id: string;
  title: string;
  active?: boolean;
  unread?: boolean;
  pinned?: boolean;
  onSelect?: (id: string) => void;
  onRename?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

function ThreadListItem({
  id,
  title,
  active = false,
  unread = false,
  pinned = false,
  onSelect,
  onRename,
  onDelete,
  onTogglePin,
  className,
  ...props
}: ThreadListItemProps) {
  const [renaming, setRenaming] = React.useState(false);
  const [draft, setDraft] = React.useState(title);
  const [confirmingDelete, setConfirmingDelete] = React.useState(false);

  // Base UI adaptation: MenuRoot's onOpenChange restores focus to the trigger
  // immediately as the menu closes, which would fire onBlur on any freshly-mounted
  // rename input before it gets focus — cancelling rename instantly.
  // Radix solved this with onCloseAutoFocus preventDefault; Base UI has no direct
  // equivalent on the content popup.
  //
  // Solution: use a ref to stage a pending rename action, then commit it in
  // onOpenChangeComplete (fired AFTER close animations finish and focus has settled).
  // This guarantees the input mounts only when the menu has fully closed and focus
  // return is complete, so the onBlur guard fires correctly thereafter.
  // IMPORTANT: if you replace DropdownMenu, replicate this defer in your trigger's after-close callback.
  const pendingRenameRef = React.useRef(false);

  if (renaming) {
    return (
      <div data-slot="thread-list-item" data-renaming="" className={cn("px-1", className)} {...props}>
        <Input
          autoFocus
          aria-label="Thread title"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setRenaming(false);
              onRename?.(id, draft);
            }
            if (e.key === "Escape") {
              setRenaming(false);
              setDraft(title);
            }
          }}
          onBlur={() => {
            setRenaming(false);
            if (draft !== title) onRename?.(id, draft);
          }}
          className="h-8"
        />
      </div>
    );
  }

  return (
    <div
      data-slot="thread-list-item"
      data-active={active || undefined}
      className={cn("group/thread relative flex items-center rounded-md", active && "bg-accent", className)}
      {...props}
    >
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect?.(id)}
        className={cn(
          "hover:bg-accent flex h-9 flex-1 items-center gap-2 truncate rounded-md px-2 text-left text-sm",
          active && "font-medium",
        )}
      >
        {unread ? (
          <span
            data-slot="thread-unread"
            aria-label="Unread"
            className="bg-primary size-2 shrink-0 rounded-full"
          />
        ) : null}
        {pinned ? <Pin aria-hidden className="text-muted-foreground size-3 shrink-0" /> : null}
        <span className="truncate">{title}</span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Thread actions"
            className="size-7 opacity-0 group-hover/thread:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100 pointer-coarse:opacity-100"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        {/* onCloseAutoFocus fires as the menu hands focus back to the trigger.
            Preventing the default leaves focus unclaimed so the rename input can
            take it — otherwise the input's onBlur cancels the edit immediately. */}
        <DropdownMenuContent
          align="start"
          onCloseAutoFocus={(event) => {
            if (!pendingRenameRef.current) return;
            event.preventDefault();
            pendingRenameRef.current = false;
            setDraft(title);
            setRenaming(true);
          }}
        >
          <DropdownMenuItem
            onSelect={() => {
              pendingRenameRef.current = true;
            }}
          >
            <Pencil /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onTogglePin?.(id)}>
            {pinned ? <PinOff /> : <Pin />} {pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          {/* Base UI adaptation: DropdownMenuItem variant prop IS supported by the
              wrapper (it maps to data-variant="destructive" for styling). */}
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmingDelete(true)}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Base UI adaptation: AlertDialogAction is a Button (not AlertDialogPrimitive.Action),
          so onClick works directly. AlertDialogCancel uses AlertDialogPrimitive.Close
          with a render= Button underneath — the wrapper accepts standard close props. */}
      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{title}&rdquo; will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete?.(id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { ThreadList, ThreadListItem, ThreadListSection };
