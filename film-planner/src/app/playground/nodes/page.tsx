"use client"

import * as React from "react"
import {
  ArrowUp,
  AudioLines,
  AudioWaveform,
  Captions,
  Clapperboard,
  Download,
  Ellipsis,
  Grid3x3,
  Hand,
  ImageIcon,
  Link2,
  MessageCircle,
  MessageSquareText,
  Mic,
  MousePointer2,
  Music,
  Play,
  Plus,
  RefreshCw,
  ScanFace,
  Share,
  Sparkles,
  Type,
  Upload,
  UserRound,
  Video,
  Volume2,
  ChevronDown,
  Check,
  Gem,
  Folder,
  Cloud,
  PauseIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/* ---------------------------------- Ports ---------------------------------- */

function Port({
  icon: Icon,
  className,
  muted,
}: {
  icon: React.ElementType
  className?: string
  muted?: boolean
}) {
  return (
    <button
      className={cn(
        "flex size-7 items-center justify-center rounded-full border shadow-sm transition-transform hover:scale-110",
        muted
          ? "border-neutral-300 bg-white text-neutral-500"
          : "border-blue-200 bg-blue-100 text-blue-600",
        className
      )}
    >
      <Icon className="size-3.5" />
    </button>
  )
}

/* ------------------------------- Node card --------------------------------- */

function NodeCard({
  kind,
  model,
  leftPorts,
  withPrompt,
  children,
}: {
  kind: "video" | "image"
  model: string
  leftPorts: { icon: React.ElementType; muted?: boolean }[]
  withPrompt?: boolean
  children?: React.ReactNode
}) {
  const KindIcon = kind === "video" ? Video : ImageIcon
  return (
    <div className="relative">
      {/* left ports */}
      <div className="absolute -left-10 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {leftPorts.map((p, i) => (
          <Port key={i} icon={p.icon} muted={p.muted} />
        ))}
      </div>
      {/* output port */}
      <Port
        icon={kind === "video" ? Video : ImageIcon}
        className="absolute -right-10 top-6"
      />

      <div className="flex w-[420px] flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
        {/* header */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-700">
            <KindIcon className="size-3.5" />
            {kind === "video" ? "Video" : "Image"}
          </div>
          <span className="text-[12px] text-neutral-400">{model}</span>
        </div>
        {/* preview */}
        <div className="mx-1 flex h-[280px] flex-col items-center justify-center gap-2 rounded-lg bg-neutral-50">
          <KindIcon className="size-6 text-neutral-300" />
          <span className="text-[13px] text-neutral-400">
            Your generation will appear here
          </span>
        </div>
        {/* footer */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          {withPrompt ? (
            <Input
              placeholder="Describe the image..."
              className="h-9 flex-1 border-none px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
          ) : (
            <div className="flex-1" />
          )}
          <div className="flex overflow-hidden rounded-md">
            <Button size="sm" className="h-8 rounded-r-none px-4">
              Run
            </Button>
            <Separator orientation="vertical" className="bg-white/20" />
            <Button size="sm" className="h-8 rounded-l-none px-1.5">
              <ChevronDown className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

/* --------------------------- Settings toolbars ------------------------------ */

function ToolbarButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("h-8 gap-1 px-2 text-[13px] font-normal text-neutral-600", className)}
    >
      {children}
    </Button>
  )
}

function VideoSettingsBar() {
  return (
    <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
      <ToolbarButton>
        Veo 3.1 Fast <ChevronDown className="size-3.5 text-neutral-400" />
      </ToolbarButton>
      <ToolbarButton>16:9</ToolbarButton>
      <ToolbarButton>720p</ToolbarButton>
      <ToolbarButton>4s</ToolbarButton>
      <ToolbarButton>
        <Volume2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton>
        <Download className="size-4" />
      </ToolbarButton>
      <ToolbarButton>
        <Ellipsis className="size-4" />
      </ToolbarButton>
    </div>
  )
}

function ImageSettingsBar() {
  return (
    <div className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
      <ToolbarButton>
        GPT Image 2 <ChevronDown className="size-3.5 text-neutral-400" />
      </ToolbarButton>
      <ToolbarButton>16:9</ToolbarButton>
      <ToolbarButton>1K</ToolbarButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 gap-1 px-2 text-[13px] font-medium"
          >
            <Gem className="size-3.5" /> Medium
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32">
          <DropdownMenuLabel className="text-[11px] font-medium tracking-wide text-neutral-400">
            QUALITY
          </DropdownMenuLabel>
          <DropdownMenuItem>Low</DropdownMenuItem>
          <DropdownMenuItem>
            Medium <Check className="ml-auto size-3.5" />
          </DropdownMenuItem>
          <DropdownMenuItem>High</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToolbarButton>
        <Download className="size-4" />
      </ToolbarButton>
      <ToolbarButton>
        <Ellipsis className="size-4" />
      </ToolbarButton>
    </div>
  )
}

/* ------------------------------ Bottom bars -------------------------------- */

function CanvasPromptBar() {
  return (
    <div className="flex w-[560px] items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pl-4 pr-1.5 shadow-md">
      <Sparkles className="size-4 shrink-0 text-neutral-400" />
      <Input
        placeholder="Replace the image with a sunset..."
        className="h-8 flex-1 border-none px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <Button variant="ghost" size="icon" className="size-8 rounded-full">
        <Plus className="size-4 text-neutral-500" />
      </Button>
      <Button size="icon" className="size-8 rounded-full">
        <ArrowUp className="size-4" />
      </Button>
    </div>
  )
}

const paletteTools: { icon: React.ElementType; active?: boolean }[] = [
  { icon: ImageIcon },
  { icon: Clapperboard },
  { icon: UserRound },
  { icon: Mic },
  { icon: AudioWaveform },
  { icon: Sparkles },
  { icon: Music },
  { icon: MessageSquareText },
  { icon: ScanFace },
  { icon: RefreshCw },
  { icon: Captions },
  { icon: Type },
  { icon: Upload },
]

function ToolPalette() {
  return (
    <div className="flex items-center gap-1 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-md">
      <Button size="icon" className="size-9 rounded-xl">
        <MousePointer2 className="size-4" />
      </Button>
      <Button variant="ghost" size="icon" className="size-9 rounded-xl text-neutral-500">
        <Hand className="size-4" />
      </Button>
      <Button variant="ghost" size="icon" className="size-9 rounded-xl text-neutral-500">
        <MessageCircle className="size-4" />
      </Button>
      <Separator orientation="vertical" className="mx-1 !h-5" />
      {paletteTools.map(({ icon: Icon }, i) => (
        <Button
          key={i}
          variant="ghost"
          size="icon"
          className="size-9 rounded-xl text-neutral-500"
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </div>
  )
}

/* --------------------------------- Header ---------------------------------- */

function CanvasHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-2 font-semibold">
          <PauseIcon className="size-4" /> Flows
        </Button>
        <Separator orientation="vertical" className="!h-4" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 font-normal text-neutral-600"
        >
          Luxury Perfume ...
        </Button>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-white">
          <Sparkles className="size-3.5" /> Create Template
        </Button>
        <Button variant="ghost" size="sm" className="h-9 gap-1 px-2 text-neutral-600">
          106% <ChevronDown className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 text-neutral-500">
          <Cloud className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 text-neutral-500">
          <MessageCircle className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 text-neutral-500">
          <Folder className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 text-neutral-500">
          <RefreshCw className="size-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-white">
          <Share className="size-3.5" /> Share
        </Button>
        <div className="ml-1 size-8 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" />
      </div>
    </header>
  )
}

/* ---------------------------------- Page ----------------------------------- */

export default function NodesPlayground() {
  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden bg-neutral-50"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--color-neutral-200) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <CanvasHeader />

      {/* nodes */}
      <div className="flex flex-1 items-center justify-center gap-28 pb-24">
        <NodeCard
          kind="video"
          model="Veo 3.1 Fast"
          leftPorts={[
            { icon: AudioLines },
            { icon: Volume2 },
            { icon: ImageIcon },
            { icon: Type, muted: true },
          ]}
        >
          <VideoSettingsBar />
        </NodeCard>

        <NodeCard
          kind="image"
          model="GPT Image 2"
          withPrompt
          leftPorts={[{ icon: Link2 }, { icon: Type, muted: true }]}
        >
          <ImageSettingsBar />
        </NodeCard>
      </div>

      {/* bottom */}
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3">
        <CanvasPromptBar />
        <ToolPalette />
      </div>
    </div>
  )
}
