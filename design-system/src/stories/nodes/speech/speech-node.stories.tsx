import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioLines, CheckIcon, ChevronsUpDown, EllipsisIcon, SlidersHorizontal, Trash2Icon, TriangleAlert, Volume2 } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/Text to Speech/States',
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

const voices = [
  {
    value: 'roger',
    name: 'Roger',
    traits: 'Laid-Back, Casual, Resonant',
    swatch: 'from-amber-700 to-stone-900',
  },
  {
    value: 'sarah',
    name: 'Sarah',
    traits: 'Warm, Clear, Confident',
    swatch: 'from-rose-400 to-rose-700',
  },
  {
    value: 'adam',
    name: 'Adam',
    traits: 'Deep, Narrative, Calm',
    swatch: 'from-sky-500 to-indigo-800',
  },
]

/** Voice picker row inside the card — avatar swatch + name/traits + chevrons. */
const VoiceSelect = () => {
  const [voice, setVoice] = useState('roger')
  const selected = voices.find((v) => v.value === voice)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-border px-2 text-left text-[13px] text-neutral-700 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted/50">
        <span
          aria-hidden="true"
          className={`size-5 shrink-0 rounded-full bg-linear-to-br ${selected?.swatch}`}
        />
        <span className="min-w-0 flex-1 truncate">
          {selected?.name} - {selected?.traits}
        </span>
        <ChevronsUpDown
          aria-hidden="true"
          className="size-3.5 shrink-0 text-neutral-400"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {voices.map((v) => (
          <DropdownMenuItem key={v.value} onSelect={() => setVoice(v.value)}>
            <span
              aria-hidden="true"
              className={`size-5 shrink-0 rounded-full bg-linear-to-br ${v.swatch}`}
            />
            <span className="min-w-0 flex-1 truncate">
              {v.name} - {v.traits}
            </span>
            {v.value === voice && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ModelSelect = () => {
  const [model, setModel] = useState('Eleven Multilingual v2')
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Model" chevron>
        {model}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Model">
        <NodeMenuSelectGroup value={model} onValueChange={setModel}>
          {[
            'Eleven Multilingual v2',
            'Eleven Turbo v2.5',
            'Eleven Flash v2.5',
          ].map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const SpeechNodeMenu = () => (
  <NodeMenu aria-label="Text to Speech node settings">
    <ModelSelect />
    <NodeMenuSeparator />
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
      <AudioLines aria-hidden="true" />
      Text to Speech
    </AINodeTitle>
    <AINodeMeta>Eleven Multilingual v2</AINodeMeta>
  </AINodeHeader>
)

const ports = (
  <>
    {/* text in — centered on the text area */}
    <AINodePorts side="input" className="top-[250px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* audio out — centered on the preview strip */}
    <AINodePorts side="output" className="top-[77px]">
      <NodePort type="sound" />
    </AINodePorts>
  </>
)

const SpeechNode = ({
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
  <div className="flex w-[420px] flex-col items-center gap-4">
    <AINode selected={selected} inert={inert || undefined} className="w-full shrink-0">
        {header}
        {/* preview strip */}
        <AINodePreview className="h-[84px] flex-row px-4">
          {preview ?? (
            <>
              <Volume2 aria-hidden="true" className="size-4 text-neutral-400" />
              <p className="text-[15px] text-neutral-400">
                Your audio will appear here
              </p>
            </>
          )}
        </AINodePreview>

        {/* voice row */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <VoiceSelect />
          <button
            type="button"
            aria-label="Voice settings"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 outline-none transition-colors hover:bg-muted hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
          >
            <SlidersHorizontal aria-hidden="true" />
          </button>
        </div>

        {/* prompt section */}
        <div className="flex flex-col gap-2 px-4 py-3">
          <textarea
            aria-label="Prompt"
            placeholder="Enter text to generate speech..."
            defaultValue={promptValue}
            className="h-[52px] w-full resize-none bg-transparent text-[15px] leading-snug text-neutral-700 outline-none placeholder:text-neutral-400"
          />
          <div className="flex justify-end">
            <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
          </div>
        </div>

        {ports}
    </AINode>
    <SpeechNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <SpeechNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <SpeechNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <SpeechNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Welcome to the forest — where every shadow tells a story.')
    await expect(prompt).toHaveValue('Welcome to the forest — where every shadow tells a story.')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <SpeechNode selected promptValue='Welcome to the forest — where every shadow tells a story.' />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <SpeechNode
      loading
      promptValue="Welcome to the forest — where every shadow tells a story."
      preview={
        <>
          <Spinner className="size-4 text-neutral-400" />
          <p className="text-[15px] text-neutral-400">Generating…</p>
        </>
      }
    />
  ),
}

export const Generated: Story = {
  render: () => (
    <SpeechNode
      promptValue="Welcome to the forest — where every shadow tells a story."
      preview={
        <>
          <AudioLines aria-hidden="true" className="size-5 text-neutral-500" />
          <p className="text-[15px] text-neutral-500">0:07</p>
        </>
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <SpeechNode
      promptValue='Welcome to the forest — where every shadow tells a story.'
      runLabel="Retry"
      preview={
        <>
          <TriangleAlert aria-hidden="true" className="size-5 text-destructive" />
          <p role="status" className="text-[15px] text-destructive">
            Generation failed. Try again.
          </p>
        </>
      }
    />
  ),
}
