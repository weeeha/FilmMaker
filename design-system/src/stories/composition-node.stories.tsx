import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DownloadIcon,
  EllipsisIcon,
  Images,
  Plus,
  Trash2Icon,
  Video,
  Volume2,
} from 'lucide-react'

import { AINode, AINodePorts } from '@/components/ai/ai-node'
import { NodeMenu, NodeMenuAction, NodeMenuSeparator } from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'
import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Composition',
  component: AINode,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    // room for the ports floating outside the card
    (Story) => (
      <div className="px-16 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AINode>

export default meta
type Story = StoryObj<typeof meta>

const runMenu = (
  <>
    <DropdownMenuItem>Run this node</DropdownMenuItem>
    <DropdownMenuItem>Run all nodes</DropdownMenuItem>
  </>
)

/** Timeline ruler — a tick every 2s across 30s. */
const TimelineRuler = () => {
  const ticks = Array.from({ length: 15 }, (_, i) => i * 2)
  return (
    <div className="flex h-[26px] w-full items-start border-b border-border pt-1">
      {ticks.map((seconds, i) => (
        <div
          key={seconds}
          className="flex min-w-0 flex-1 items-start gap-1 border-l border-neutral-200 pl-1 first:border-l-0 first:pl-0"
        >
          <span className="text-[10px] leading-none text-neutral-400">
            {i === 0 ? '0' : `0:${String(seconds).padStart(2, '0')}`}
          </span>
        </div>
      ))}
    </div>
  )
}

/** One timeline track — clips area, mute toggle and volume rail. */
const Track = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex h-[62px] w-full items-center gap-2 border-b border-border pr-2 pl-3">
    <div className="flex h-full min-w-0 flex-1 items-center gap-2 py-2">
      {children}
    </div>
    <button
      type="button"
      aria-label="Mute track"
      className="flex size-7 shrink-0 items-center justify-center rounded-md text-neutral-500 outline-none transition-colors hover:bg-muted hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
    >
      <Volume2 aria-hidden="true" />
    </button>
    {/* volume rail — filled portion sits at the bottom */}
    <div
      role="img"
      aria-label="Track volume"
      className="flex h-8 w-2 shrink-0 flex-col justify-end overflow-hidden rounded-xs bg-neutral-200"
    >
      <div className="h-1/3 w-full bg-neutral-900" />
    </div>
  </div>
)

const CompositionNodeMenu = () => (
  <NodeMenu aria-label="Composition node actions">
    <NodeMenuAction aria-label="Download">
      <DownloadIcon />
    </NodeMenuAction>
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

const ports = (
  <>
    {/* video out — aligned to the preview area */}
    <AINodePorts side="output" className="top-[28px]">
      <NodePort type="video" />
    </AINodePorts>
    {/* video track in */}
    <AINodePorts side="input" className="top-[463px] translate-y-0">
      <NodePort type="video" />
    </AINodePorts>
    {/* audio track in */}
    <AINodePorts side="input" className="top-[525px] translate-y-0">
      <NodePort type="sound" />
    </AINodePorts>
  </>
)

const CompositionNode = ({
  selected = false,
  preview,
  loading = false,
  videoClip,
  audioClip,
}: {
  selected?: boolean
  preview?: React.ReactNode
  loading?: boolean
  videoClip?: React.ReactNode
  audioClip?: React.ReactNode
}) => (
  <div className="flex w-[900px] flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      {/* node name above the card — 13px, --color-neutral-500 */}
      <span className="flex items-center gap-1.5 px-1 text-[13px] font-medium text-neutral-500 [&_svg]:size-3.5">
        <Images aria-hidden="true" />
        Composition
      </span>

      <AINode selected={selected} className="w-[900px] shrink-0">
        {/* preview area with the Run button pinned bottom-right */}
        <div className="relative flex h-[420px] w-full flex-col items-center justify-center gap-2 border-b border-border">
          {preview ?? (
            <>
              <Video aria-hidden="true" className="size-6 text-neutral-400" />
              <p className="text-[15px] text-neutral-400">
                Your generation will appear here
              </p>
            </>
          )}
          <div className="absolute right-4 bottom-4">
            <RunButton loading={loading} menu={runMenu} />
          </div>
        </div>

        <TimelineRuler />
        <Track>{videoClip}</Track>
        <Track>{audioClip}</Track>

        {/* add track row */}
        <button
          type="button"
          className="flex h-[42px] w-full items-center gap-2 rounded-b-[12px] px-3 text-[13px] text-neutral-500 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
        >
          <Plus aria-hidden="true" />
          Add audio track
        </button>

        {ports}
      </AINode>
    </div>
    <div className="flex justify-center">
      <CompositionNodeMenu />
    </div>
  </div>
)

export const Default: Story = {
  render: () => <CompositionNode />,
}

export const Selected: Story = {
  render: () => <CompositionNode selected />,
}

export const Generating: Story = {
  render: () => (
    <CompositionNode
      loading
      preview={
        <>
          <Spinner className="size-6 text-neutral-400" />
          <p className="text-[15px] text-neutral-400">Generating…</p>
        </>
      }
    />
  ),
}

export const WithClips: Story = {
  name: 'With Clips',
  render: () => (
    <CompositionNode
      preview={
        <div
          role="img"
          aria-label="Composition preview"
          className="size-full bg-linear-to-br from-neutral-700 to-neutral-500"
        />
      }
      videoClip={
        <div className="flex h-full w-2/5 items-center rounded-md bg-blue-100 px-2 text-xs text-blue-700">
          Drone shot
        </div>
      }
      audioClip={
        <div className="flex h-full w-3/5 items-center rounded-md bg-purple-100 px-2 text-xs text-purple-700">
          Ambient score
        </div>
      }
    />
  ),
}
