import * as React from "react"

import { Button } from "@/components/ui/button"
import { RunMenu } from "@/components/ai/run-menu"
import { CostTooltip } from "@/components/ai/cost-tooltip"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type RunButtonProps = {
  /** Text on the main action segment. */
  label?: string
  /** Shows a spinner and blocks interaction while a generation is running. */
  loading?: boolean
  /** Opens the run-options menu on mount — used to document the open state. */
  defaultMenuOpen?: boolean
  /**
   * Credits this run will spend. Shows a cost tooltip on hovering the primary
   * segment: `0` reads as a free run, any other number as a charged one.
   */
  cost?: number
  disabled?: boolean
  onRun?: React.MouseEventHandler<HTMLButtonElement>
  /** Dropdown content (e.g. `DropdownMenuItem`s) for the chevron segment. Omit to render the main segment only. */
  menu?: React.ReactNode
  className?: string
}

/**
 * Split action button (Figma: "RunButton"): a primary "Run" segment plus an
 * attached chevron segment that opens a dropdown with run options.
 */
function RunButton({
  label = "Run",
  loading = false,
  disabled = false,
  defaultMenuOpen = false,
  cost,
  onRun,
  menu,
  className,
}: RunButtonProps) {
  const primary = (
    <Button
      onClick={(event) => {
        // guards the keyboard path too — the button stays focusable while
        // running, so `disabled` is not an option here
        if (loading) return
        onRun?.(event)
      }}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      aria-label={loading ? "Running" : undefined}
      // sizes and colours come from the --run-button-* tokens
      // bg-clip-border paints over the base Button's transparent border so the
      // two segments join without a visible seam
      // loading: the spinner overlays the (hidden) label so the segment keeps
      // its exact size and the chevron never moves; hover is blocked while
      // running, so the fill stays at rest
      className={cn(
        "relative h-(--run-button-height) gap-(--run-button-gap) rounded-run-button bg-clip-border text-(length:--run-button-label)",
        "ps-(--run-button-padding-start) pe-(--run-button-padding-end)",
        "bg-run-button text-run-button-foreground hover:bg-run-button-hover",
        "disabled:opacity-(--run-button-disabled-opacity) aria-disabled:pointer-events-none",
        menu != null && "rounded-e-none",
      )}
    >
      <span className={loading ? "invisible" : undefined}>{label}</span>
      {loading && (
        <Spinner
          className="absolute inset-0 m-auto size-(--run-button-icon)"
          aria-hidden="true"
        />
      )}
    </Button>
  )

  return (
    <div
      data-slot="run-button"
      className={cn("inline-flex items-center", className)}
    >
      {cost === undefined ? (
        primary
      ) : (
        <CostTooltip cost={cost}>{primary}</CostTooltip>
      )}
      {menu != null && (
        <RunMenu
          disabled={disabled}
          defaultOpen={defaultMenuOpen}
          attached
        >
          {menu}
        </RunMenu>
      )}
    </div>
  )
}

export { RunButton }
