import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, EllipsisIcon, Trash2Icon, TriangleAlert } from 'lucide-react'
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
import { AvatarSparkleIcon } from '@/components/ai/avatar-sparkle-icon'
import { NodeMenu, NodeMenuAction, NodeMenuSeparator } from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { DemoRunButton, ModelPicker } from '../shared'

const meta = {
  title: 'AI New/Node Cards/Avatar/States',
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

// text in — next to the prompt input
const inputPorts = (
  <AINodePorts side="input" className="top-[353px] translate-y-0">
    <NodePort type="text" />
  </AINodePorts>
)

const outputPort = (
  <AINodePorts side="output">
    <NodePort type="avatar" />
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
    <AvatarSparkleIcon aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your avatar will appear here</p>
  </>
)

const AvatarNodeMenu = () => (
  <NodeMenu aria-label="Avatar node settings">
    <ModelPicker
      heading="Avatars"
      defaultValue="maya"
      models={[
        {
          value: 'maya',
          name: 'Maya',
          description: 'Warm presenter, studio lighting.',
          icon: <AvatarSparkleIcon />,
        },
        {
          value: 'kai',
          name: 'Kai',
          description: 'Casual explainer, outdoor scenes.',
          icon: <AvatarSparkleIcon />,
        },
        {
          value: 'nova',
          name: 'Nova',
          description: 'Editorial look, high contrast.',
          icon: <AvatarSparkleIcon />,
        },
      ]}
    />
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
      <AvatarSparkleIcon aria-hidden="true" />
      Avatar
    </AINodeTitle>
    <AINodeMeta>Maya</AINodeMeta>
  </AINodeHeader>
)

const AvatarNode = ({
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
          placeholder="Describe your avatar..."
          defaultValue={promptValue}
          disabled={promptDisabled}
        />
        <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
    <AvatarNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <AvatarNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <AvatarNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <AvatarNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Friendly news anchor, soft studio light')
    await expect(prompt).toHaveValue('Friendly news anchor, soft studio light')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <AvatarNode selected promptValue='Friendly news anchor, soft studio light' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <AvatarNode
      loading
      promptValue='Friendly news anchor, soft studio light'
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
    <AvatarNode
      promptValue='Friendly news anchor, soft studio light'
      preview={
        <div
          role="img"
          aria-label="Generated avatar preview"
          className="size-full bg-linear-to-b from-stone-300 via-stone-400 to-stone-600"
        />
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <AvatarNode
      promptValue='Friendly news anchor, soft studio light'
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
