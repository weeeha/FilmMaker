import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, EllipsisIcon, Trash2Icon, UserRound, Video } from 'lucide-react'

import { AINode, AINodePorts } from '@/components/ai/ai-node'
import {
  NodeMenu,
  NodeMenuAction,
  NodeMenuSelect,
  NodeMenuSelectContent,
  NodeMenuSelectGroup,
  NodeMenuSelectItem,
  NodeMenuSelectTrigger,
  NodeMenuSeparator,
} from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'
import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Lip Sync',
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

const ModelSelect = () => {
  const [model, setModel] = useState('Creatify Aurora')
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Model" chevron>
        {model}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Model">
        <NodeMenuSelectGroup value={model} onValueChange={setModel}>
          {['Creatify Aurora', 'Sync Labs v2', 'HeyGen Avatar IV'].map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const ResolutionSelect = () => {
  const [value, setValue] = useState('720p')
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Resolution">{value}</NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Resolution">
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {['480p', '720p', '1080p', '4K'].map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const LipSyncNodeMenu = () => (
  <NodeMenu aria-label="Lip Sync node settings">
    <ModelSelect />
    <ResolutionSelect />
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Download">
      <DownloadIcon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

/** Label + model name above the card. */
const LipSyncNodeLabel = () => (
  <div className="flex items-center justify-between gap-2 px-1">
    <span className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 [&_svg]:size-3.5">
      <UserRound aria-hidden="true" />
      Lip Sync
    </span>
    <span className="text-[13px] text-neutral-400">Creatify Aurora</span>
  </div>
)

const ports = (
  <>
    {/* avatar in */}
    <AINodePorts side="input" className="top-[251px] translate-y-0">
      <NodePort type="avatar" />
    </AINodePorts>
    {/* audio in */}
    <AINodePorts side="input" className="top-[304px] translate-y-0">
      <NodePort type="sound" />
    </AINodePorts>
    {/* text guidance in — aligned to the prompt row */}
    <AINodePorts side="input" className="top-[379px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* video out */}
    <AINodePorts side="output" className="top-[18px]">
      <NodePort type="video" />
    </AINodePorts>
  </>
)

const LipSyncNode = ({
  selected = false,
  preview,
  promptValue,
  loading = false,
}: {
  selected?: boolean
  preview?: React.ReactNode
  promptValue?: string
  loading?: boolean
}) => (
  <div className="flex w-[360px] flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <LipSyncNodeLabel />
      <AINode selected={selected} className="w-[360px] shrink-0">
        {/* preview area */}
        <div className="flex h-[352px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-t-[12px] border-b border-border">
          {preview ?? (
            <>
              <Video aria-hidden="true" className="size-6 text-neutral-400" />
              <p className="text-[15px] text-neutral-400">
                Your generation will appear here
              </p>
            </>
          )}
        </div>

        {/* prompt row */}
        <div className="flex items-center gap-2 px-4 py-4">
          <input
            type="text"
            aria-label="Prompt"
            placeholder="Guide the lip sync..."
            defaultValue={promptValue}
            className="h-9 min-w-0 flex-1 bg-transparent text-[15px] text-neutral-700 outline-none placeholder:text-neutral-400"
          />
          <RunButton loading={loading} menu={runMenu} />
        </div>

        {ports}
      </AINode>
    </div>
    <div className="flex justify-center">
      <LipSyncNodeMenu />
    </div>
  </div>
)

export const Default: Story = {
  render: () => <LipSyncNode />,
}

export const Selected: Story = {
  render: () => <LipSyncNode selected />,
}

export const Generating: Story = {
  render: () => (
    <LipSyncNode
      loading
      promptValue="Keep the delivery calm and natural"
      preview={
        <>
          <Spinner className="size-6 text-neutral-400" />
          <p className="text-[15px] text-neutral-400">Generating…</p>
        </>
      }
    />
  ),
}

export const Result: Story = {
  render: () => (
    <LipSyncNode
      promptValue="Keep the delivery calm and natural"
      preview={
        <div
          role="img"
          aria-label="Generated lip sync preview"
          className="size-full bg-linear-to-b from-stone-300 via-stone-400 to-stone-600"
        />
      }
    />
  ),
}
