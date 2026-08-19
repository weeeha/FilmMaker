import * as React from "react"
import {
  Box,
  ImageIcon,
  PanelLeftDashed,
  PanelRightDashed,
  Music,
  Speech,
  Type,
  Video,
  Volume2,
} from "lucide-react"

import { AvatarSparkleIcon } from "@/components/ai/avatar-sparkle-icon"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const portConfig = {
  video: { icon: Video, label: "Video", color: "blue" },
  image: { icon: ImageIcon, label: "Image", color: "blue" },
  audio: { icon: Music, label: "Audio", color: "purple" },
  speech: { icon: Speech, label: "Speech", color: "blue" },
  sound: { icon: Volume2, label: "Sound", color: "purple" },
  "3d": { icon: Box, label: "3D", color: "blue" },
  avatar: { icon: AvatarSparkleIcon, label: "Avatar", color: "tan" },
  "start-frame": { icon: PanelLeftDashed, label: "Start frame", color: "blue" },
  "end-frame": { icon: PanelRightDashed, label: "End frame", color: "blue" },
  text: { icon: Type, label: "Text", color: "neutral" },
} satisfies Record<
  string,
  {
    icon: React.ElementType
    label: string
    color: "blue" | "purple" | "tan" | "neutral"
  }
>

export type NodePortType = keyof typeof portConfig

const portColors = {
  // --color-blue-100 / --color-blue-200 / --color-blue-600
  blue: "border-blue-200 bg-blue-100 text-blue-600",
  // --color-purple-100 / --color-purple-200 / --color-purple-600
  purple: "border-purple-200 bg-purple-100 text-purple-600",
  // warm tan from Figma — no matching --color token yet
  tan: "border-[#CFC0A6] bg-[#DCD0BB] text-[#453D31]",
  // white / --color-neutral-300 / --color-neutral-500
  neutral: "border-neutral-300 bg-white text-neutral-500",
}

/**
 * Connection port for AI nodes (Figma: "Port / *").
 * 28px circle with a 14px type icon. Per current design, the `text` port is
 * neutral, the `sound` port is purple, and all other types are blue
 * (--color-blue-100 / --color-blue-200 / --color-blue-600).
 * Hovering shows the port name in a tooltip (disable with `tooltip={false}`).
 */
function NodePort({
  type,
  tooltip = true,
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<"div"> & { type: NodePortType; tooltip?: boolean }) {
  const { icon: Icon, label, color } = portConfig[type]
  const port = (
    <div
      data-slot="node-port"
      data-type={type}
      role="img"
      aria-label={ariaLabel ?? `${label} port`}
      className={cn(
        // shadow: 0 1px 1px 6% from Figma (no shadow token)
        "flex size-7 items-center justify-center rounded-full border bg-clip-padding shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06)]",
        portColors[color],
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </div>
  )

  if (!tooltip) {
    return port
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{port}</TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

export { NodePort }
