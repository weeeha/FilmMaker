import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, EllipsisIcon, Trash2Icon, TriangleAlert, UserRound, Video } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import { AINode, AINodeHeader, AINodeMeta, AINodePorts, AINodePreview, AINodeTitle } from '@/components/ai/ai-node'
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
import { DemoRunButton } from '../shared'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/Lip Sync/States',
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

const header = (
  <AINodeHeader>
    <AINodeTitle>
      <UserRound aria-hidden="true" />
      Lip Sync
    </AINodeTitle>
    <AINodeMeta>Creatify Aurora</AINodeMeta>
  </AINodeHeader>
)

const ports = (
  <>
    {/* avatar + audio in — centered on the preview area */}
    <AINodePorts side="input" className="top-[193px] translate-y-0">
      <NodePort type="avatar" />
      <NodePort type="sound" />
    </AINodePorts>
    {/* text guidance in — centered on the prompt row */}
    <AINodePorts side="input" className="top-[433px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* video out — aligned with the preview top */}
    <AINodePorts side="output" className="top-[49px]">
      <NodePort type="video" />
    </AINodePorts>
  </>
)

const LipSyncNode = ({
  selected = false,
  inert = false,
  preview,
  promptValue,
  loading = false,
  runLabel,
}: {
  selected?: boolean
  inert?: boolean
  preview?: React.ReactNode
  promptValue?: string
  loading?: boolean
  runLabel?: string
}) => (
  <div className="flex w-[360px] flex-col items-center gap-4">
    <AINode selected={selected} inert={inert || undefined} className="w-[360px] shrink-0">
        {header}
        {/* preview area */}
        <AINodePreview className="h-[352px]">
          {preview ?? (
            <>
              <Video aria-hidden="true" className="size-6 text-neutral-400" />
              <p className="text-[15px] text-neutral-400">
                Your generation will appear here
              </p>
            </>
          )}
        </AINodePreview>

        {/* prompt row */}
        <div className="flex items-center gap-2 px-4 py-4">
          <input
            type="text"
            aria-label="Prompt"
            placeholder="Guide the lip sync..."
            defaultValue={promptValue}
            className="h-9 min-w-0 flex-1 bg-transparent text-[15px] text-neutral-700 outline-none placeholder:text-neutral-400"
          />
          <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
        </div>

        {ports}
    </AINode>
    <LipSyncNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <LipSyncNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <LipSyncNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <LipSyncNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Keep the delivery calm and natural')
    await expect(prompt).toHaveValue('Keep the delivery calm and natural')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <LipSyncNode selected promptValue='Keep the delivery calm and natural' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
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

export const Generated: Story = {
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

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <LipSyncNode
      promptValue='Keep the delivery calm and natural'
      runLabel="Retry"
      preview={
        <>
          <TriangleAlert aria-hidden="true" className="size-6 text-destructive" />
          <p role="status" className="text-[15px] text-destructive">
            Generation failed. Try again.
          </p>
        </>
      }
    />
  ),
}
