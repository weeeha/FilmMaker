import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, Ear, EllipsisIcon, Trash2Icon } from 'lucide-react'

import {
  AINode,
  AINodeFooter,
  AINodeHeader,
  AINodeMeta,
  AINodePorts,
  AINodePreview,
  AINodePrompt,
  AINodeTitle,
} from '@/components/ai/ai-node'
import { NodePort } from '@/components/ai/node-port'
import { DemoRunButton } from '../shared'
import { NodeMenu, NodeMenuAction } from '@/components/ai/node-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/Voice Isolator/States',
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

const inputPorts = (
  <AINodePorts side="input">
    <NodePort type="audio" />
  </AINodePorts>
)

const outputPort = (
  <AINodePorts side="output">
    <NodePort type="audio" />
  </AINodePorts>
)

const runMenu = (
  <>
    <DropdownMenuItem>Run this node</DropdownMenuItem>
    <DropdownMenuItem>Run all nodes</DropdownMenuItem>
  </>
)

const emptyPreview = (
  <>
    <Ear aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Isolated voice will appear here</p>
  </>
)

const VoiceIsolatorNodeMenu = () => (
  <NodeMenu aria-label="Voice isolator node actions">
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

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
    <AINode inert>
      <AINodeHeader>
        <AINodeTitle>
          <Ear aria-hidden="true" />
          Voice Isolator
        </AINodeTitle>
        <AINodeMeta>Voice Isolator</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Connect audio to isolate the voice..." disabled />
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
      <VoiceIsolatorNodeMenu />
    </div>
  ),
}

export const Selected: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
    <AINode selected>
      <AINodeHeader>
        <AINodeTitle>
          <Ear aria-hidden="true" />
          Voice Isolator
        </AINodeTitle>
        <AINodeMeta>Voice Isolator</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Connect audio to isolate the voice..." disabled />
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
      <VoiceIsolatorNodeMenu />
    </div>
  ),
}

export const Generating: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Ear aria-hidden="true" />
          Voice Isolator
        </AINodeTitle>
        <AINodeMeta>Voice Isolator</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        <Spinner className="size-6 text-neutral-400" />
        <p className="text-[13px] text-neutral-400">Isolating voice…</p>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Connect audio to isolate the voice..." disabled />
        <DemoRunButton loading menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
      <VoiceIsolatorNodeMenu />
    </div>
  ),
}
