import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CheckIcon,
  DownloadIcon,
  EllipsisIcon,
  GemIcon,
  ImageIcon,
  ImageUpIcon,
  SparklesIcon,
  Trash2Icon,
  ZapIcon,
} from 'lucide-react'

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
import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Image',
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
    <NodePort type="image" />
    <NodePort type="text" />
  </AINodePorts>
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

const imageModels = [
  {
    value: 'gpt-image-2',
    name: 'GPT Image 2',
    description: 'Sharp text rendering, strong prompt following.',
    icon: <SparklesIcon />,
  },
  {
    value: 'flux-1-1',
    name: 'FLUX 1.1',
    description: 'Fast, photorealistic, great for iterations.',
    icon: <ZapIcon />,
  },
  {
    value: 'seedream-4',
    name: 'Seedream 4.0',
    description: 'Stylized art direction and consistent characters.',
    icon: <ImageIcon />,
  },
]

const ModelPicker = () => {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState('gpt-image-2')
  const selected = imageModels.find((m) => m.value === model)

  return (
    <NodeMenuModelSelect open={open} onOpenChange={setOpen}>
      <NodeMenuModelSelectTrigger>{selected?.name}</NodeMenuModelSelectTrigger>
      <NodeMenuModelSelectContent>
        <NodeMenuModelSelectInput placeholder="Search all models..." />
        <NodeMenuModelSelectList>
          <NodeMenuModelSelectEmpty>No models found.</NodeMenuModelSelectEmpty>
          <NodeMenuModelSelectGroup heading="Image models">
            {imageModels.map((m) => (
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

const OptionSelect = ({
  label,
  options,
  defaultValue,
  icon,
}: {
  label: string
  options: string[]
  defaultValue: string
  icon?: React.ReactNode
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label={label}>
        {icon}
        {value}
      </NodeMenuSelectTrigger>
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

const ImageNodeMenu = () => (
  <NodeMenu aria-label="Image node settings">
    <ModelPicker />
    <OptionSelect
      label="Aspect Ratio"
      options={['21:9', '16:9', '4:3', '1:1', '3:4', '9:16']}
      defaultValue="16:9"
    />
    <OptionSelect
      label="Resolution"
      options={['512', '1K', '2K', '4K']}
      defaultValue="1K"
    />
    <OptionSelect
      label="Quality"
      options={['Low', 'Medium', 'High']}
      defaultValue="Medium"
      icon={<GemIcon aria-hidden="true" />}
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
      <ImageUpIcon aria-hidden="true" />
      Image
    </AINodeTitle>
    <AINodeMeta>GPT Image 2</AINodeMeta>
  </AINodeHeader>
)

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AINode>
        {header}
        <AINodePreview>{emptyPreview}</AINodePreview>
        <AINodeFooter>
          <AINodePrompt placeholder="Describe your image..." />
          <RunButton menu={runMenu} />
        </AINodeFooter>
        {inputPorts}
        {outputPort}
      </AINode>
      <ImageNodeMenu />
    </div>
  ),
}

export const Generating: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AINode>
        {header}
        <AINodePreview>
          <Spinner className="size-6 text-neutral-400" />
          <p className="text-[13px] text-neutral-400">Generating…</p>
        </AINodePreview>
        <AINodeFooter>
          <AINodePrompt
            placeholder="Describe your image..."
            defaultValue="A misty pine forest at golden hour"
            disabled
          />
          <RunButton loading menu={runMenu} />
        </AINodeFooter>
        {inputPorts}
        {outputPort}
      </AINode>
      <ImageNodeMenu />
    </div>
  ),
}

export const Result: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AINode>
        {header}
        <AINodePreview>
          {/* stand-in for the generated image */}
          <div
            role="img"
            aria-label="Generated image preview"
            className="size-full bg-linear-to-br from-amber-200 via-orange-300 to-emerald-700"
          />
        </AINodePreview>
        <AINodeFooter>
          <AINodePrompt
            placeholder="Describe your image..."
            defaultValue="A misty pine forest at golden hour"
          />
          <RunButton menu={runMenu} />
        </AINodeFooter>
        {inputPorts}
        {outputPort}
      </AINode>
      <ImageNodeMenu />
    </div>
  ),
}
