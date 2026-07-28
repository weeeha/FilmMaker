import * as React from "react"
import { ImageIcon, Link2, Music, Speech, Type, Video } from "lucide-react"

import { cn } from "@/lib/utils"

const portConfig = {
  video: { icon: Video, label: "Video" },
  image: { icon: ImageIcon, label: "Image" },
  audio: { icon: Music, label: "Audio" },
  speech: { icon: Speech, label: "Speech" },
  text: { icon: Type, label: "Text" },
  link: { icon: Link2, label: "Link" },
} satisfies Record<string, { icon: React.ElementType; label: string }>

export type NodePortType = keyof typeof portConfig

/**
 * Connection port for AI nodes (Figma: "Port / *").
 * 28px circle with a 14px type icon. Per current design, the `text` port is
 * neutral (white / --color-neutral-300 border / --color-neutral-500 icon) and
 * all other types are blue (--color-blue-100 / --color-blue-200 / --color-blue-600).
 */
function NodePort({
  type,
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<"div"> & { type: NodePortType }) {
  const { icon: Icon, label } = portConfig[type]
  return (
    <div
      data-slot="node-port"
      data-type={type}
      role="img"
      aria-label={ariaLabel ?? `${label} port`}
      className={cn(
        // shadow: 0 1px 1px 6% from Figma (no shadow token)
        "flex size-7 items-center justify-center rounded-full border bg-clip-padding shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06)]",
        type === "text"
          ? "border-neutral-300 bg-white text-neutral-500"
          : "border-blue-200 bg-blue-100 text-blue-600",
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </div>
  )
}

export { NodePort }
