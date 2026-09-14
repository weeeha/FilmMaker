import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export type RunMenuProps = {
  /** Menu content — `DropdownMenuItem`s with the run options. */
  children: React.ReactNode
  /** Accessible name of the icon-only trigger. */
  label?: string
  disabled?: boolean
  /** Opens on mount — used to document the open state. */
  defaultOpen?: boolean
  /** Squares the leading corners so it can sit against a primary action. */
  attached?: boolean
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"]
  className?: string
}

/**
 * Run options menu (Figma: "RunButton / dropdown"). An icon-only trigger plus
 * its menu — the secondary half of the split Run Button, and usable on its own.
 * The chevron points down at rest and up while the menu is open.
 */
function RunMenu({
  children,
  label = "Open run options",
  disabled = false,
  defaultOpen = false,
  attached = false,
  align = "end",
  className,
}: RunMenuProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={label}
          disabled={disabled}
          // sizes and colours come from the --run-button-* tokens; open reuses
          // the hover fill so only this segment reads as active
          className={cn(
            "h-(--run-button-height) w-(--run-button-dropdown-width) rounded-run-button bg-clip-border p-0",
            "bg-run-button text-run-button-foreground hover:bg-run-button-hover",
            "disabled:opacity-(--run-button-disabled-opacity) data-[state=open]:bg-run-button-open",
            attached && "rounded-s-none",
            className
          )}
        >
          <ChevronDown
            aria-hidden="true"
            // points up while the menu is open
            className={cn(
              "size-(--run-button-icon) transition-transform duration-150",
              open && "rotate-180"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export { RunMenu }
