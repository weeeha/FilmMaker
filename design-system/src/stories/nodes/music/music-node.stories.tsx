import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AudioLines, CheckIcon, EllipsisIcon, ListMusic, Music, SparklesIcon, Trash2Icon, TriangleAlert } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import { AINode, AINodeHeader, AINodeMeta, AINodePorts, AINodePreview, AINodeTitle } from '@/components/ai/ai-node'
import {
  NodeMenu,
  NodeMenuAction,
  NodeMenuModelSelect,
  NodeMenuModelSelectContent,
  NodeMenuModelSelectEmpty,
  NodeMenuModelSelectGroup,
  NodeMenuModelSelectInput,
  NodeMenuModelSelectItem,
  NodeMenuModelSelectItemIcon,
  NodeMenuModelSelectList,
  NodeMenuModelSelectTrigger,
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
import { Switch } from '@/components/ui/switch'

const meta = {
  title: 'AI New/Node Cards/Music/States',
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

const musicModels = [
  {
    value: 'music-v2',
    name: 'Music v2',
    description: 'Full tracks with vocals, lyrics-aware.',
    icon: <Music />,
  },
  {
    value: 'lyria-2',
    name: 'Lyria 2',
    description: 'Instrumental scoring, cinematic beds.',
    icon: <SparklesIcon />,
  },
]

const ModelPicker = () => {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState('music-v2')
  const selected = musicModels.find((m) => m.value === model)

  return (
    <NodeMenuModelSelect open={open} onOpenChange={setOpen}>
      <NodeMenuModelSelectTrigger>{selected?.name}</NodeMenuModelSelectTrigger>
      <NodeMenuModelSelectContent>
        <NodeMenuModelSelectInput placeholder="Search all models..." />
        <NodeMenuModelSelectList>
          <NodeMenuModelSelectEmpty>No models found.</NodeMenuModelSelectEmpty>
          <NodeMenuModelSelectGroup heading="Music models">
            {musicModels.map((m) => (
              <NodeMenuModelSelectItem
                key={m.value}
                value={`${m.name} ${m.description}`}
                onSelect={() => {
                  setModel(m.value)
                  setOpen(false)
                }}
              >
                <NodeMenuModelSelectItemIcon>{m.icon}</NodeMenuModelSelectItemIcon>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {m.description}
                  </span>
                </span>
                {m.value === model && <CheckIcon className="ml-auto self-center" />}
              </NodeMenuModelSelectItem>
            ))}
          </NodeMenuModelSelectGroup>
        </NodeMenuModelSelectList>
      </NodeMenuModelSelectContent>
    </NodeMenuModelSelect>
  )
}

const DurationSelect = () => {
  const [value, setValue] = useState('Auto')
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Duration">{value}</NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Duration">
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {['Auto', '0:30', '1:00', '2:00', '3:00'].map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const MusicNodeMenu = () => (
  <NodeMenu aria-label="Music node settings">
    <ModelPicker />
    <DurationSelect />
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
      <Music aria-hidden="true" />
      Music
    </AINodeTitle>
    <AINodeMeta>Eleven Music</AINodeMeta>
  </AINodeHeader>
)

const ports = (
  <>
    {/* music reference in — centered on the preview strip */}
    <AINodePorts side="input" className="top-[77px] translate-y-0">
      <NodePort type="audio" />
    </AINodePorts>
    {/* lyrics text in — centered on the lyrics section */}
    <AINodePorts side="input" className="top-[190px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* prompt text in — centered on the prompt section */}
    <AINodePorts side="input" className="top-[305px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
    {/* audio out — centered on the preview strip */}
    <AINodePorts side="output" className="top-[77px]">
      <NodePort type="audio" />
    </AINodePorts>
  </>
)

const MusicNode = ({
  selected = false,
  inert = false,
  preview,
  lyrics = true,
  lyricsValue,
  promptValue,
  loading = false,
  runLabel,
}: {
  selected?: boolean
  inert?: boolean
  preview?: React.ReactNode
  lyrics?: boolean
  lyricsValue?: string
  promptValue?: string
  loading?: boolean
  runLabel?: string
}) => {
  const [lyricsOn, setLyricsOn] = useState(lyrics)
  return (
    <div className="flex w-[420px] flex-col items-center gap-4">
      <AINode selected={selected} inert={inert || undefined} className="w-full shrink-0">
          {header}
          {/* preview strip */}
          <AINodePreview className="h-[84px] flex-row px-4">
            {preview ?? (
              <>
                <Music aria-hidden="true" className="size-4 text-neutral-400" />
                <p className="text-[15px] text-neutral-400">
                  Your music will appear here
                </p>
              </>
            )}
          </AINodePreview>

          {/* lyrics section */}
          <div className="border-b border-border">
            <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-600 [&_svg]:size-3.5">
                <ListMusic aria-hidden="true" />
                Lyrics
              </span>
              <Switch
                aria-label="Lyrics"
                checked={lyricsOn}
                onCheckedChange={setLyricsOn}
              />
            </div>
            <textarea
              aria-label="Lyrics"
              placeholder="Add your lyrics here or leave blank to infer from prompt"
              defaultValue={lyricsValue}
              disabled={!lyricsOn}
              className="h-[76px] w-full resize-none bg-transparent px-4 pb-3 text-[15px] leading-snug text-neutral-700 outline-none placeholder:text-neutral-400 disabled:opacity-50"
            />
          </div>

          {/* prompt section */}
          <div className="flex flex-col gap-2 px-4 py-3">
            <textarea
              aria-label="Prompt"
              placeholder="Describe the music to generate..."
              defaultValue={promptValue}
              className="h-[52px] w-full resize-none bg-transparent text-[15px] leading-snug text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            <div className="flex justify-end">
              <DemoRunButton label={runLabel} loading={loading} menu={runMenu} />
            </div>
          </div>

          {ports}
      </AINode>
      <MusicNodeMenu />
    </div>
  )
}

export const Default: Story = {
  render: () => <MusicNode inert />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <MusicNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <MusicNode selected />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'Dreamy synth-pop with a slow build and warm bass')
    await expect(prompt).toHaveValue('Dreamy synth-pop with a slow build and warm bass')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => <MusicNode selected promptValue='Dreamy synth-pop with a slow build and warm bass' />,
}

export const LyricsOff: Story = {
  name: 'Lyrics Off',
  render: () => <MusicNode lyrics={false} />,
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <MusicNode
      loading
      promptValue="Dreamy synth-pop with a slow build and warm bass"
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
    <MusicNode
      promptValue="Dreamy synth-pop with a slow build and warm bass"
      lyricsValue="Neon hums above the empty street / I keep the tempo in my chest"
      preview={
        <>
          <AudioLines aria-hidden="true" className="size-5 text-neutral-500" />
          <p className="text-[15px] text-neutral-500">2:14</p>
        </>
      }
    />
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <MusicNode
      promptValue='Dreamy synth-pop with a slow build and warm bass'
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
