import { } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageIcon, ImageUpIcon, TriangleAlert } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { ImageNodeMenu } from '../menus'

const meta = {
  title: 'AI New/Node Cards/Image Generation/States',
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
  <>
    <AINodePorts side="input">
      <NodePort type="image" />
    </AINodePorts>
    {/* text in — next to the prompt input */}
    <AINodePorts side="input" className="top-[353px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
  </>
)

const outputPort = (
  <AINodePorts side="output">
    <NodePort type="image" />
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
    <ImageIcon aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your generation will appear here</p>
  </>
)

const header = (
  <AINodeHeader>
    <AINodeTitle>
      <ImageUpIcon aria-hidden="true" />
      Image
    </AINodeTitle>
    <AINodeMeta>GPT Image 2</AINodeMeta>
  </AINodeHeader>
)

const ImageGenerationNode = ({
  selected = false,
  inert = false,
  preview,
  promptValue,
  promptDisabled = false,
  loading = false,
  runLabel,
}: {
  selected?: boolean
  inert?: boolean
  preview?: React.ReactNode
  promptValue?: string
  promptDisabled?: boolean
  loading?: boolean
  runLabel?: string
}) => (
  <div className="flex flex-col items-center gap-4">
    <AINode selected={selected} inert={inert || undefined}>
      {header}
      <AINodePreview>{preview ?? emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your image..."
          defaultValue={promptValue}
          disabled={promptDisabled}
        />
        <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
    <ImageNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <ImageGenerationNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <ImageGenerationNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <ImageGenerationNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'A misty pine forest at golden hour')
    await expect(prompt).toHaveValue('A misty pine forest at golden hour')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <ImageGenerationNode selected promptValue='A misty pine forest at golden hour' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <ImageGenerationNode
      loading
      promptValue='A misty pine forest at golden hour'
      promptDisabled
      preview={
        <>
          <Spinner className="size-6 text-neutral-400" />
          <p className="text-[13px] text-neutral-400">Generating…</p>
        </>
      }
    />
  ),
}

export const Generated: Story = {
  render: () => (
    <ImageGenerationNode
      promptValue='A misty pine forest at golden hour'
      preview={
        <div
          role="img"
          aria-label="Generated image preview"
          className="size-full bg-linear-to-br from-amber-200 via-orange-300 to-emerald-700"
        />
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <ImageGenerationNode
      promptValue='A misty pine forest at golden hour'
      runLabel="Retry"
      preview={
        <>
          <TriangleAlert aria-hidden="true" className="size-6 text-destructive" />
          <p role="status" className="text-[13px] text-destructive">
            Generation failed. Try again.
          </p>
        </>
      }
    />
  ),
}
