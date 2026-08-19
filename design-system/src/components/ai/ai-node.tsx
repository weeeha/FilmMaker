import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Card shell for AI generation nodes on the Video Generator canvas
 * (Figma: "AI Node / Video"). 420px wide, 12px radius, 1px --border;
 * `selected` switches to a 2px --color-blue-600 border without layout shift.
 */
function AINode({
  selected = false,
  disabled = false,
  className,
  ...props
}: React.ComponentProps<typeof Card> & { selected?: boolean; disabled?: boolean }) {
  return (
    <Card
      data-slot="ai-node"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        // radius 12px and shadow 0 1px 1.5px 5% from Figma (no matching tokens)
        // overflow-visible so the floating ports aren't clipped by Card's overflow-hidden
        "relative w-[420px] gap-0 overflow-visible rounded-[12px] border border-border bg-card py-0 shadow-[0px_1px_1.5px_0px_rgba(0,0,0,0.05)] ring-0",
        // selected: 1px border + 1px ring in neutral-900 reads as the 2px Figma border
        "data-selected:border-neutral-900 data-selected:ring-1 data-selected:ring-neutral-900",
        // disabled: dimmed, flat — no shadow
        "data-disabled:opacity-60 data-disabled:shadow-none",
        className
      )}
      {...props}
    />
  )
}

function AINodeHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-node-header"
      className={cn(
        "flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

/** Icon + node name. Pass a 14px lucide icon as the first child. */
function AINodeTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-node-title"
      // 13px title from Figma (no matching --text token); --color-neutral-700
      className={cn(
        "flex items-center gap-1.5 text-[13px] font-medium text-neutral-700 [&_svg]:size-3.5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

/** Secondary header text, e.g. the model name ("Veo 3.1 Fast"). */
function AINodeMeta({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="ai-node-meta"
      className={cn("text-xs whitespace-nowrap text-neutral-400", className)}
      {...props}
    />
  )
}

/**
 * Generation preview area: 280px tall, --color-neutral-50 fill, --radius-md
 * corners, inset 4px from the card edges. Compose the empty / generating /
 * media / error content as children.
 */
function AINodePreview({ className, ...props }: React.ComponentProps<"div">) {
  return (
    // p-3 — 12px between the placeholder and the card borders / adjacent sections
    <div data-slot="ai-node-preview-wrap" className="w-full p-3">
      <div
        data-slot="ai-node-preview"
        className={cn(
          "flex h-[280px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-neutral-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function AINodeFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ai-node-footer"
      className={cn("flex w-full items-center justify-between gap-2 px-3 py-2.5", className)}
      {...props}
    />
  )
}

/** Borderless prompt input in the node footer. */
function AINodePrompt({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      aria-label="Prompt"
      data-slot="ai-node-prompt"
      // 13px text from Figma (no matching --text token); placeholder --color-neutral-400
      className={cn(
        "h-8 min-w-0 flex-1 rounded-sm bg-transparent px-1 text-[13px] text-neutral-700 outline-none placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Absolutely positioned port stack floating 13px off the card edge.
 * `input` centers on the left edge; `output` sits at the top of the right edge.
 */
function AINodePorts({
  side = "input",
  className,
  ...props
}: React.ComponentProps<"div"> & { side?: "input" | "output" }) {
  return (
    <div
      data-slot="ai-node-ports"
      data-side={side}
      className={cn(
        "absolute flex flex-col gap-2",
        side === "input"
          ? "top-1/2 -left-[41px] -translate-y-1/2"
          : // aligned with the preview top edge (header 37px + 12px gap)
            "top-[49px] -right-[41px]",
        className
      )}
      {...props}
    />
  )
}

export {
  AINode,
  AINodeHeader,
  AINodeTitle,
  AINodeMeta,
  AINodePreview,
  AINodeFooter,
  AINodePrompt,
  AINodePorts,
}
