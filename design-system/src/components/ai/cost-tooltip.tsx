import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * The two kinds of run cost. `free` is not a discount — it is a run that
 * spends nothing, e.g. a cached result or a node that costs nothing to re-run.
 */
export type CostTooltipType = "free" | "charged"

/** `0` is a free run, anything else is charged. */
function costTooltipType(cost: number): CostTooltipType {
  return cost === 0 ? "free" : "charged"
}

/** "This run will cost 2,950 credits" — grouped thousands, singular at 1. */
function costTooltipLabel(cost: number) {
  return `This run will cost ${cost.toLocaleString("en-US")} credit${
    cost === 1 ? "" : "s"
  }`
}

export type CostTooltipProps = {
  /** Credits this run will spend. */
  cost: number
  /** Which side of the trigger the tooltip opens on. */
  side?: React.ComponentProps<typeof TooltipContent>["side"]
  /** Opens on mount — used to document the tooltip at rest. */
  defaultOpen?: boolean
  /** The control the tooltip describes; receives the hover. */
  children: React.ReactNode
}

/**
 * Cost tooltip (Figma: "Run cost"). Explains what a run will spend, shown on
 * hovering the control it wraps. Built on the shared Tooltip, so fill, radius
 * and label size follow the design system.
 */
function CostTooltip({
  cost,
  side = "top",
  defaultOpen,
  children,
}: CostTooltipProps) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        data-slot="cost-tooltip"
        data-type={costTooltipType(cost)}
      >
        {costTooltipLabel(cost)}
      </TooltipContent>
    </Tooltip>
  )
}

export { CostTooltip, costTooltipLabel, costTooltipType }
