import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioLines, AudioWaveform, DownloadIcon, EllipsisIcon, SparklesIcon, Trash2Icon, TriangleAlert } from 'lucide-react'
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
  title: 'AI New/Node Cards/Voice Changer/States',
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
    <AudioWaveform aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your generation will appear here</p>
  </>
)

const VoiceChangerNodeMenu = () => (
  <NodeMenu aria-label="Voice changer node settings">
    <ModelPicker
      heading="Voice models"
      defaultValue="eleven-v3"
      models={[
        {
          value: 'eleven-v3',
          name: 'Eleven v3',
          description: 'Most expressive voice conversion.',
          icon: <AudioWaveform />,
        },
        {
          value: 'eleven-multilingual-v2',
          name: 'Eleven Multilingual v2',
          description: 'Stable conversion across 29 languages.',
          icon: <SparklesIcon />,
        },
      ]}
    />
    <OptionSelect
      label="Voice"
      options={['Rachel', 'Adam', 'Bella', 'Josh']}
      defaultValue="Rachel"
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

const VoiceChangerNode = ({
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
          <AudioWaveform aria-hidden="true" />
          Voice Changer
        </AINodeTitle>
        <AINodeMeta>Eleven v3</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{preview ?? emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe the target voice..."
          defaultValue={promptValue}
          disabled={promptDisabled}
        />
        <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
    <VoiceChangerNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <VoiceChangerNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <VoiceChangerNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <VoiceChangerNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Deep narrator voice, slight rasp')
    await expect(prompt).toHaveValue('Deep narrator voice, slight rasp')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <VoiceChangerNode selected promptValue='Deep narrator voice, slight rasp' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <VoiceChangerNode
      loading
      promptValue='Deep narrator voice, slight rasp'
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
    <VoiceChangerNode
      promptValue='Deep narrator voice, slight rasp'
      preview={
        <>
          <AudioLines aria-hidden="true" className="size-8 text-neutral-500" />
          <p className="text-[13px] text-neutral-500">0:12</p>
        </>
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <VoiceChangerNode
      promptValue='Deep narrator voice, slight rasp'
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
