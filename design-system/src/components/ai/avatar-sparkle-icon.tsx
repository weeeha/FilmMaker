import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Person + sparkle glyph used by the Avatar node and its port (Figma:
 * "Icon / Avatar"). Composed here because lucide has no person-with-sparkle
 * icon; geometry follows the lucide 24px grid / 2px stroke.
 */
function AvatarSparkleIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6", className)}
      {...props}
    >
      {/* head */}
      <circle cx="13" cy="8" r="4" />
      {/* shoulders */}
      <path d="M5 21a8 8 0 0 1 13.3-5.9" />
      {/* sparkle, upper-left */}
      <path d="M4 4.5 4.7 6.8 7 7.5l-2.3.7L4 10.5l-.7-2.3L1 7.5l2.3-.7z" />
    </svg>
  )
}

export { AvatarSparkleIcon }
