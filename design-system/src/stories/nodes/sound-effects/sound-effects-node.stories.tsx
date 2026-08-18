import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioLines, DownloadIcon, EllipsisIcon, Music, Trash2Icon, TriangleAlert, ZapIcon } from 'lucide-react'
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
import { NodeMenu, NodeMenuAction, NodeMenuSeparator } from '@/components/ai/node-menu'
import { DemoRunButton, ModelPicker, OptionSelect } from '../shared'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/Sound Effects/States',
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

const SoundEffectsNodeMenu = () => (
  <NodeMenu aria-label="Sound effects node settings">
    <ModelPicker
      heading="Audio models"
      defaultValue="lyria-2"
      models={[
        {
          value: 'lyria-2',
          name: 'Lyria 2',
          description: 'Rich, layered sound design from text.',
          icon: <AudioLines />,
        },
        {
          value: 'eleven-sfx',
          name: 'Eleven SFX',
          description: 'Short, punchy effects with precise timing.',
          icon: <ZapIcon />,
        },
      ]}
    />
    <OptionSelect
      label="Duration"
      options={['Auto', '1s', '5s', '10s', '22s']}
      defaultValue="Auto"
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

const SoundEffectsNode = ({
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
      <AINodeHeader>
        <AINodeTitle>
          <Music aria-hidden="true" />
          Sound Effects
        </AINodeTitle>
        <AINodeMeta>Lyria 2</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{preview ?? emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your music..."
          defaultValue={promptValue}
          disabled={promptDisabled}
        />
        <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
    <SoundEffectsNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <SoundEffectsNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <SoundEffectsNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <SoundEffectsNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Slow ambient score with soft strings')
    await expect(prompt).toHaveValue('Slow ambient score with soft strings')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <SoundEffectsNode selected promptValue='Slow ambient score with soft strings' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <SoundEffectsNode
      loading
      promptValue='Slow ambient score with soft strings'
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
    <SoundEffectsNode
      promptValue='Slow ambient score with soft strings'
      preview={
        <>
          <AudioLines aria-hidden="true" className="size-8 text-neutral-500" />
          <p className="text-[13px] text-neutral-500">0:32</p>
        </>
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <SoundEffectsNode
      promptValue='Slow ambient score with soft strings'
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
