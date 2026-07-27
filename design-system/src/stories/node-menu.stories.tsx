import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BarChart3Icon,
  CheckIcon,
  DownloadIcon,
  EllipsisIcon,
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
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta = {
  title: 'AI New/Node Menu',
  component: NodeMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NodeMenu>

export default meta
type Story = StoryObj

type Model = {
  value: string
  name: string
  description: string
  icon: React.ReactNode
  badges?: string[]
  count?: string
  group: string
  tags: string[]
}

const models: Model[] = [
  {
    value: 'seedance-2',
    name: 'Seedance 2.0',
    description: 'Next-gen realism, high prompt control, video/audio references.',
    icon: <BarChart3Icon />,
    badges: ['Beta'],
    count: '3,258',
    group: 'Recently used',
    tags: ['Realistic', 'Audio'],
  },
  {
    value: 'veo-3-1-fast',
    name: 'Veo 3.1 Fast',
    description: 'Like Veo 3.1, fast, cost-efficient, audio-backed, up to 4K.',
    icon: <ZapIcon />,
    count: '2,424',
    group: 'Recently used',
    tags: ['Fast', 'Low Cost', 'Audio'],
  },
  {
    value: 'gemini-omni-flash',
    name: 'Gemini Omni Flash',
    description: 'Physics-aware, consistent, image & video refs, audio-backed.',
    icon: <SparklesIcon />,
    badges: ['New', 'Beta'],
    count: '2,451',
    group: 'Generate',
    tags: ['Realistic', 'Audio'],
  },
  {
    value: 'aleph-2',
    name: 'Aleph 2.0',
    description: 'Precise edits with consistent characters and scenes.',
    icon: <SparklesIcon />,
    badges: ['New'],
    count: '1,697/s',
    group: 'Generate',
    tags: ['Editing'],
  },
]

const filters = ['Realistic', 'Upscaling', 'Editing', 'Audio', 'Fast', 'Low Cost']
const groups = ['Recently used', 'Generate']

const ModelPickerDemo = () => {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState('seedance-2')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const selected = models.find((m) => m.value === model)
  const visible = activeFilter
    ? models.filter((m) => m.tags.includes(activeFilter))
    : models

  return (
    <NodeMenuModelSelect open={open} onOpenChange={setOpen}>
      <NodeMenuModelSelectTrigger>{selected?.name}</NodeMenuModelSelectTrigger>
      <NodeMenuModelSelectContent>
        <NodeMenuModelSelectInput placeholder="Search all models..." />
        <NodeMenuModelSelectFilters>
          {filters.map((filter) => (
            <NodeMenuModelSelectFilter
              key={filter}
              pressed={activeFilter === filter}
              onPressedChange={(pressed) =>
                setActiveFilter(pressed ? filter : null)
              }
            >
              {filter}
            </NodeMenuModelSelectFilter>
          ))}
        </NodeMenuModelSelectFilters>
        <NodeMenuModelSelectList>
          <NodeMenuModelSelectEmpty>No models found.</NodeMenuModelSelectEmpty>
          {groups.map((group) => {
            const items = visible.filter((m) => m.group === group)
            if (items.length === 0) {
              return null
            }
            return (
              <NodeMenuModelSelectGroup key={group} heading={group}>
                {items.map((m) => (
                  <NodeMenuModelSelectItem
                    key={m.value}
                    value={`${m.name} ${m.description}`}
                    onSelect={() => {
                      setModel(m.value)
                      setOpen(false)
                    }}
                  >
                    <NodeMenuModelSelectItemIcon>
                      {m.icon}
                    </NodeMenuModelSelectItemIcon>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="font-medium">{m.name}</span>
                        {m.badges?.map((badge) => (
                          <Badge
                            key={badge}
                            variant="secondary"
                            className="rounded-full px-1.5 py-px text-[10px]"
                          >
                            {badge}
                          </Badge>
                        ))}
                        {m.count && (
                          <span className="text-[10px] text-muted-foreground">
                            {m.count}
                          </span>
                        )}
                      </span>
                      <span className="text-xs leading-snug text-muted-foreground">
                        {m.description}
                      </span>
                    </span>
                    {m.value === model && (
                      <CheckIcon className="ml-auto self-center" />
                    )}
                  </NodeMenuModelSelectItem>
                ))}
              </NodeMenuModelSelectGroup>
            )
          })}
        </NodeMenuModelSelectList>
      </NodeMenuModelSelectContent>
    </NodeMenuModelSelect>
  )
}

const OptionSelectDemo = ({
  label,
  options,
  defaultValue,
}: {
  label: string
  options: string[]
  defaultValue: string
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label={label}>{value}</NodeMenuSelectTrigger>
      <NodeMenuSelectContent label={label}>
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {options.map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const SoundToggleDemo = () => {
  const [sound, setSound] = useState(true)
  return (
    <NodeMenuToggle aria-label="Sound" pressed={sound} onPressedChange={setSound}>
      {sound ? <Volume2Icon /> : <VolumeXIcon />}
    </NodeMenuToggle>
  )
}

const OverflowMenuDemo = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <NodeMenuAction aria-label="More actions">
        <EllipsisIcon />
      </NodeMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-56">
      <DropdownMenuItem>
        Run
        <DropdownMenuShortcut>⌘↵</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>Extract generation</DropdownMenuItem>
      <DropdownMenuItem disabled>
        Download
        <DropdownMenuShortcut>⌘⇧D</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>Save to assets</DropdownMenuItem>
      <DropdownMenuItem disabled>Set as thumbnail</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Rename</DropdownMenuItem>
      <DropdownMenuItem>
        Copy
        <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Paste
        <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Duplicate
        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Focus node
        <DropdownMenuShortcut>⌘.</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>Reference in agent chat</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled>Mark template output</DropdownMenuItem>
      <DropdownMenuItem disabled>Delete generation</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">
        Delete node
        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const AllControls: Story = {
  render: () => (
    <NodeMenu aria-label="Video node settings">
      <ModelPickerDemo />
      <OptionSelectDemo
        label="Aspect Ratio"
        options={['21:9', '16:9', '4:3', '1:1', '3:4', '9:16']}
        defaultValue="16:9"
      />
      <OptionSelectDemo
        label="Resolution"
        options={['480p', '720p', '1080p', '4K']}
        defaultValue="720p"
      />
      <OptionSelectDemo
        label="Duration"
        options={[
          '4s',
          '5s',
          '6s',
          '7s',
          '8s',
          '9s',
          '10s',
          '11s',
          '12s',
          '13s',
          '14s',
          '15s',
        ]}
        defaultValue="4s"
      />
      <SoundToggleDemo />
      <NodeMenuSeparator />
      <NodeMenuAction aria-label="Download">
        <DownloadIcon />
      </NodeMenuAction>
      <NodeMenuAction aria-label="Delete">
        <Trash2Icon />
      </NodeMenuAction>
      <OverflowMenuDemo />
    </NodeMenu>
  ),
}

export const ModelSelect: Story = {
  render: () => (
    <NodeMenu aria-label="Model selection">
      <ModelPickerDemo />
    </NodeMenu>
  ),
}

export const OptionSelects: Story = {
  render: () => (
    <NodeMenu aria-label="Generation settings">
      <OptionSelectDemo
        label="Aspect Ratio"
        options={['21:9', '16:9', '4:3', '1:1', '3:4', '9:16']}
        defaultValue="16:9"
      />
      <OptionSelectDemo
        label="Resolution"
        options={['480p', '720p', '1080p', '4K']}
        defaultValue="720p"
      />
      <OptionSelectDemo
        label="Duration"
        options={['4s', '8s', '12s', '15s']}
        defaultValue="4s"
      />
    </NodeMenu>
  ),
}

export const Actions: Story = {
  render: () => (
    <NodeMenu aria-label="Node actions">
      <SoundToggleDemo />
      <NodeMenuSeparator />
      <NodeMenuAction aria-label="Download">
        <DownloadIcon />
      </NodeMenuAction>
      <NodeMenuAction aria-label="Delete">
        <Trash2Icon />
      </NodeMenuAction>
      <OverflowMenuDemo />
    </NodeMenu>
  ),
}
