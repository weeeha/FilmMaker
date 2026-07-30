import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AudioLines,
  CheckIcon,
  ChevronsUpDown,
  EllipsisIcon,
  SlidersHorizontal,
  Trash2Icon,
  Volume2,
} from 'lucide-react'

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Text to Speech',
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

/** Label + model name above the card. */
const SpeechNodeLabel = () => (
  <div className="flex items-center justify-between gap-2 px-1">
    <span className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 [&_svg]:size-3.5">
      <AudioLines aria-hidden="true" />
      Text to Speech
    </span>
    <span className="text-[13px] text-neutral-400">Eleven Multilingual v2</span>
  </div>
)

const ports = (
  <>
    {/* text in — aligned to the prompt area */}
    <AINodePorts side="input" className="top-[170px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* audio out — aligned to the preview strip */}
    <AINodePorts side="output" className="top-[28px]">
      <NodePort type="sound" />
    </AINodePorts>
  </>
)

const SpeechNode = ({
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
  <div className="flex w-[420px] flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <SpeechNodeLabel />
      <AINode selected={selected} className="shrink-0">
        {/* preview strip */}
        <div className="flex h-[84px] w-full items-center justify-center gap-2 border-b border-border px-4">
          {preview ?? (
            <>
              <Volume2 aria-hidden="true" className="size-4 text-neutral-400" />
              <p className="text-[15px] text-neutral-400">
                Your audio will appear here
              </p>
            </>
          )}
        </div>

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
            <RunButton loading={loading} menu={runMenu} />
          </div>
        </div>

        {ports}
      </AINode>
    </div>
    <div className="flex justify-center">
      <SpeechNodeMenu />
    </div>
  </div>
)

export const Default: Story = {
  render: () => <SpeechNode />,
}

export const Selected: Story = {
  render: () => <SpeechNode selected />,
}

export const Generating: Story = {
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

export const Result: Story = {
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
