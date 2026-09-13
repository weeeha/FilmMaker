import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AudioLines,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  GemIcon,
  SparklesIcon,
  Trash2Icon,
  Volume2Icon,
  VolumeXIcon,
  ZapIcon,
} from 'lucide-react'

import {
  NodeMenu,
  NodeMenuAction,
  NodeMenuModelSelect,
  NodeMenuModelSelectContent,
  NodeMenuModelSelectEmpty,
  NodeMenuModelSelectFilter,
  NodeMenuModelSelectFilters,
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
  NodeMenuToggle,
} from '@/components/ai/node-menu'
import { ModelPicker, OptionSelect } from './nodes/shared'

const meta = {
  title: 'AI New/Node Menu/Parts',
  component: NodeMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NodeMenu>

export default meta
type Story = StoryObj

/** One catalogued piece: live example + what it is + where it is used. */
const Part = ({
  name,
  usage,
  children,
}: {
  name: string
  usage: string
  children: React.ReactNode
}) => (
  <div className="grid grid-cols-[200px_1fr] items-start gap-6 py-3">
    <div className="flex flex-col gap-0.5 pt-1.5">
      <span className="text-[13px] font-medium text-neutral-700">{name}</span>
      {/* muted usage note — --color-neutral-500 */}
      <span className="text-xs text-neutral-500">{usage}</span>
    </div>
    <div className="flex min-w-0 items-center">{children}</div>
  </div>
)

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="flex flex-col">
    <h3 className="border-b border-border pb-2 text-xs font-medium tracking-wide text-neutral-500 uppercase">
      {title}
    </h3>
    <div className="divide-y divide-border">{children}</div>
  </section>
)

const SoundTogglePart = () => {
  const [on, setOn] = useState(true)
  return (
    <NodeMenuToggle aria-label="Sound" pressed={on} onPressedChange={setOn}>
      {on ? <Volume2Icon aria-hidden="true" /> : <VolumeXIcon aria-hidden="true" />}
    </NodeMenuToggle>
  )
}

const PillSelectPart = ({
  label,
  options,
  defaultValue,
  chevron = false,
  flags,
}: {
  label: string
  options: string[]
  defaultValue: string
  chevron?: boolean
  flags?: Record<string, string>
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label={label} chevron={chevron || undefined}>
        {flags && <span aria-hidden="true">{flags[value]}</span>}
        {value}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label={label}>
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {options.map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {flags && <span aria-hidden="true">{flags[option]}</span>}
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const FilteredModelPicker = () => {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState('lyria-2')
  const [filter, setFilter] = useState<string | null>(null)
  const models = [
    {
      value: 'lyria-2',
      name: 'Lyria 2',
      description: 'Rich, layered sound design from text.',
      icon: <AudioLines />,
      tags: ['Realistic'],
    },
    {
      value: 'eleven-sfx',
      name: 'Eleven SFX',
      description: 'Short, punchy effects with precise timing.',
      icon: <ZapIcon />,
      tags: ['Fast'],
    },
  ]
  const visible = filter ? models.filter((m) => m.tags.includes(filter)) : models
  return (
    <NodeMenuModelSelect open={open} onOpenChange={setOpen}>
      <NodeMenuModelSelectTrigger>
        {models.find((m) => m.value === model)?.name}
      </NodeMenuModelSelectTrigger>
      <NodeMenuModelSelectContent>
        <NodeMenuModelSelectInput placeholder="Search all models..." />
        <NodeMenuModelSelectFilters>
          {['Realistic', 'Fast', 'Low Cost'].map((f) => (
            <NodeMenuModelSelectFilter
              key={f}
              pressed={filter === f}
              onPressedChange={(p) => setFilter(p ? f : null)}
            >
              {f}
            </NodeMenuModelSelectFilter>
          ))}
        </NodeMenuModelSelectFilters>
        <NodeMenuModelSelectList>
          <NodeMenuModelSelectEmpty>No models found.</NodeMenuModelSelectEmpty>
          <NodeMenuModelSelectGroup heading="Audio models">
            {visible.map((m) => (
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

/**
 * Every building block the 13 node menus are made of, with where each one is
 * used. Pieces are shown inside a real `NodeMenu` shell so the pill sizing,
 * gaps and hover targets match production.
 */
export const AllParts: Story = {
  render: () => (
    <div className="flex w-[720px] flex-col gap-8 py-4">
      <Section title="Shell">
        <Part name="NodeMenu" usage="all 13 menus — pill container, 4px padding">
          <NodeMenu aria-label="Empty menu shell">
            <span className="px-2 py-1 text-xs text-neutral-400">empty</span>
          </NodeMenu>
        </Part>
        <Part name="NodeMenuSeparator" usage="11 menus — divides settings from actions">
          <NodeMenu aria-label="Separator example">
            <PillSelectPart
              label="Before"
              options={['16:9', '9:16']}
              defaultValue="16:9"
            />
            <NodeMenuSeparator />
            <NodeMenuAction aria-label="After">
              <Trash2Icon />
            </NodeMenuAction>
          </NodeMenu>
        </Part>
      </Section>

      <Section title="Model pickers">
        <Part name="ModelPicker" usage="7 menus — searchable list, icon + description + check">
          <NodeMenu aria-label="Model picker example">
            <ModelPicker
              heading="Video models"
              defaultValue="veo-3-1-fast"
              models={[
                {
                  value: 'veo-3-1-fast',
                  name: 'Veo 3.1 Fast',
                  description: 'Fast, cost-efficient, audio-backed, up to 4K.',
                  icon: <ZapIcon />,
                },
                {
                  value: 'gemini-omni-flash',
                  name: 'Gemini Omni Flash',
                  description: 'Physics-aware, consistent, audio-backed.',
                  icon: <SparklesIcon />,
                },
              ]}
            />
          </NodeMenu>
        </Part>
        <Part
          name="+ filter chips"
          usage="not used by any node menu yet — available for long model lists"
        >
          <NodeMenu aria-label="Filtered model picker example">
            <FilteredModelPicker />
          </NodeMenu>
        </Part>
      </Section>

      <Section title="Selects">
        <Part name="OptionSelect" usage="4 menus — aspect ratio, resolution, duration, voice">
          <NodeMenu aria-label="Option select example">
            <OptionSelect
              label="Aspect Ratio"
              options={['21:9', '16:9', '4:3', '1:1', '3:4', '9:16']}
              defaultValue="16:9"
            />
          </NodeMenu>
        </Part>
        <Part name="OptionSelect + icon" usage="Image Generation — quality">
          <NodeMenu aria-label="Option select with icon example">
            <OptionSelect
              label="Quality"
              options={['Low', 'Medium', 'High']}
              defaultValue="Medium"
              icon={<GemIcon aria-hidden="true" />}
            />
          </NodeMenu>
        </Part>
        <Part name="Pill select + chevron" usage="3 menus — model name as plain text">
          <NodeMenu aria-label="Chevron select example">
            <PillSelectPart
              label="Model"
              options={['Eleven Multilingual v2', 'Eleven Turbo v2.5']}
              defaultValue="Eleven Multilingual v2"
              chevron
            />
          </NodeMenu>
        </Part>
        <Part name="Pill select + flag" usage="Dubbing — target language">
          <NodeMenu aria-label="Language select example">
            <PillSelectPart
              label="Target language"
              options={['Spanish', 'French', 'German']}
              defaultValue="Spanish"
              chevron
              flags={{ Spanish: '🇪🇸', French: '🇫🇷', German: '🇩🇪' }}
            />
          </NodeMenu>
        </Part>
      </Section>

      <Section title="Toggle">
        <Part name="NodeMenuToggle" usage="Video Generation — sound on / off">
          <NodeMenu aria-label="Toggle example">
            <SoundTogglePart />
          </NodeMenu>
        </Part>
      </Section>

      <Section title="Actions">
        <Part name="NodeMenuAction" usage="all 13 menus — download, delete, more, duplicate">
          <NodeMenu aria-label="Actions example">
            <NodeMenuAction aria-label="Download">
              <DownloadIcon />
            </NodeMenuAction>
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
        </Part>
        <Part name="NodeMenuAction — disabled" usage="Text node while the node is inactive">
          <NodeMenu aria-label="Disabled actions example">
            <NodeMenuAction aria-label="Duplicate" disabled>
              <CopyIcon />
            </NodeMenuAction>
            <NodeMenuAction aria-label="Delete" disabled>
              <Trash2Icon />
            </NodeMenuAction>
          </NodeMenu>
        </Part>
      </Section>
    </div>
  ),
}
