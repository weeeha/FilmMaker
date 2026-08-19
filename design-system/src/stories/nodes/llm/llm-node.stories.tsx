import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Brain,
  CopyIcon,
  EllipsisIcon,
  SparklesIcon,
  Trash2Icon,
  TriangleAlert,
  ZapIcon,
} from 'lucide-react'
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
import { DemoRunButton, ModelPicker } from '../shared'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/LLM/States',
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
    <NodePort type="text" />
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
    <Brain aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your generation will appear here</p>
  </>
)

const promptText = 'Write a short film synopsis about a lighthouse keeper'

const generatedText =
  'Every night the fog rolls in, and with it come the voices. Elias, the last keeper of the Wren Point light, has logged them for thirty years — names, dates, fragments of songs from ships that vanished a century ago. When a young cartographer arrives to decommission the lighthouse, Elias must decide whether to hand over his logbooks or finish the one conversation the fog never let him complete.'

const LLMNodeMenu = () => (
  <NodeMenu aria-label="LLM node settings">
    <ModelPicker
      heading="Language models"
      defaultValue="gpt-5"
      models={[
        {
          value: 'gpt-5',
          name: 'GPT-5',
          description: 'Strong general reasoning and writing.',
          icon: <SparklesIcon />,
        },
        {
          value: 'claude-sonnet-5',
          name: 'Claude Sonnet 5',
          description: 'Nuanced long-form writing and analysis.',
          icon: <Brain />,
        },
        {
          value: 'gemini-3-pro',
          name: 'Gemini 3 Pro',
          description: 'Fast, multimodal, long context.',
          icon: <ZapIcon />,
        },
      ]}
    />
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Duplicate">
      <CopyIcon />
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
      <Brain aria-hidden="true" />
      LLM
    </AINodeTitle>
    <AINodeMeta>GPT-5</AINodeMeta>
  </AINodeHeader>
)

const LLMNode = ({
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
          placeholder="Write your prompt..."
          defaultValue={promptValue}
          disabled={promptDisabled}
        />
        <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
      </AINodeFooter>
      {inputPorts}
      {outputPort}
    </AINode>
    <LLMNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <LLMNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <LLMNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <LLMNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, promptText)
    await expect(prompt).toHaveValue(promptText)
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <LLMNode selected promptValue={promptText} />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <LLMNode
      loading
      promptValue={promptText}
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
    <LLMNode
      promptValue={promptText}
      preview={
        <div className="size-full overflow-y-auto p-4">
          <p className="text-[13px] leading-relaxed text-neutral-700">{generatedText}</p>
        </div>
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <LLMNode
      promptValue={promptText}
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
