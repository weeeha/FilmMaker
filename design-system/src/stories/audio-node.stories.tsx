import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioLines, Music } from 'lucide-react'

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
import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Audio',
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
    <NodePort type="text" />
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
    <Music aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your generation will appear here</p>
  </>
)

export const Default: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Music aria-hidden="true" />
          Audio
        </AINodeTitle>
        <AINodeMeta>Lyria 2</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Describe your music..." />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
  ),
}

export const Generating: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Music aria-hidden="true" />
          Audio
        </AINodeTitle>
        <AINodeMeta>Lyria 2</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        <Spinner className="size-6 text-neutral-400" />
        <p className="text-[13px] text-neutral-400">Generating…</p>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your music..."
          defaultValue="Slow ambient score with soft strings"
          disabled
        />
        <RunButton loading menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
  ),
}

export const Result: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Music aria-hidden="true" />
          Audio
        </AINodeTitle>
        <AINodeMeta>Lyria 2</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        {/* stand-in for the generated waveform */}
        <AudioLines aria-hidden="true" className="size-8 text-neutral-500" />
        <p className="text-[13px] text-neutral-500">0:32</p>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your music..."
          defaultValue="Slow ambient score with soft strings"
        />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
  ),
}
