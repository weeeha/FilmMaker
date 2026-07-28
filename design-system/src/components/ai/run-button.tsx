import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type RunButtonProps = {
  /** Text on the main action segment. */
  label?: string
  /** Shows a spinner and blocks interaction while a generation is running. */
  loading?: boolean
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
  onRun,
  menu,
  className,
}: RunButtonProps) {
  return (
    <div data-slot="run-button" className={cn("inline-flex items-center", className)}>
      <Button
        onClick={onRun}
        disabled={disabled || loading}
        aria-busy={loading}
        // 13px label from Figma (no matching --text token); --radius-sm = 6px
        // bg-clip-border paints over the base Button's transparent border so the
        // two segments join without a visible seam
        className={cn(
          "h-8 gap-1.5 rounded-sm bg-clip-border pl-4 pr-3 text-[13px]",
          menu != null && "rounded-r-none"
        )}
      >
        {loading && <Spinner className="size-3.5" aria-hidden="true" />}
        {label}
      </Button>
      {menu != null && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={`${label} options`}
              disabled={disabled || loading}
              className="h-8 w-6 rounded-sm rounded-l-none bg-clip-border p-0"
            >
              <ChevronDown aria-hidden="true" className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export { RunButton }
