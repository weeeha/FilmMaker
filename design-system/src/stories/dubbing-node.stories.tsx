import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Captions, DownloadIcon, EllipsisIcon, Trash2Icon } from 'lucide-react'

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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Dubbing',
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

const languages = [
  { value: 'Spanish', flag: '🇪🇸' },
  { value: 'French', flag: '🇫🇷' },
  { value: 'German', flag: '🇩🇪' },
  { value: 'Japanese', flag: '🇯🇵' },
  { value: 'Polish', flag: '🇵🇱' },
]

const LanguageSelect = () => {
  const [language, setLanguage] = useState('Spanish')
  const selected = languages.find((l) => l.value === language)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Target language" chevron>
        <span aria-hidden="true">{selected?.flag}</span>
        {selected?.value}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Target language">
        <NodeMenuSelectGroup value={language} onValueChange={setLanguage}>
          {languages.map((l) => (
            <NodeMenuSelectItem key={l.value} value={l.value}>
              <span aria-hidden="true">{l.flag}</span>
              {l.value}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const DubbingNodeMenu = () => (
  <NodeMenu aria-label="Dubbing node settings">
    <LanguageSelect />
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

/** Label + model name above the card. */
const DubbingNodeLabel = () => (
  <div className="flex items-center justify-between gap-2 px-1">
    <span className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 [&_svg]:size-3.5">
      <Captions aria-hidden="true" />
      Dubbing
    </span>
    <span className="text-[13px] text-neutral-400">Dubbing v2 Alpha</span>
  </div>
)

const ports = (
  <>
    <AINodePorts side="input" className="top-[16px] translate-y-0">
      <NodePort type="video" />
    </AINodePorts>
    <AINodePorts side="output" className="top-[16px]">
      <NodePort type="video" />
    </AINodePorts>
  </>
)

const DubbingNode = ({
  selected = false,
  body,
  disabled = true,
  loading = false,
}: {
  selected?: boolean
  body?: React.ReactNode
  disabled?: boolean
  loading?: boolean
}) => (
  <div className="flex w-[300px] flex-col gap-4">
    <div className="flex flex-col gap-1.5">
      <DubbingNodeLabel />
      <AINode selected={selected} className="w-[300px] shrink-0">
        {/* source area — empty state until a source is connected */}
        <div className="flex h-[70px] w-full items-center justify-center rounded-t-[12px] bg-neutral-50 px-4 text-center">
          {body ?? (
            <p className="text-[13px] text-neutral-500">
              Connect an audio or video source
            </p>
          )}
        </div>

        <div className="flex justify-end px-3 py-2.5">
          <RunButton disabled={disabled} loading={loading} menu={runMenu} />
        </div>

        {ports}
      </AINode>
    </div>
    <div className="flex justify-center">
      <DubbingNodeMenu />
    </div>
  </div>
)

export const Default: Story = {
  name: 'No Source',
  render: () => <DubbingNode />,
}

export const Ready: Story = {
  render: () => (
    <DubbingNode
      disabled={false}
      body={
        <p className="text-[13px] text-neutral-700">
          drone-shot-final.mp4 · 0:28
        </p>
      }
    />
  ),
}

export const Generating: Story = {
  render: () => (
    <DubbingNode
      disabled={false}
      loading
      body={
        <span className="flex items-center gap-2 text-[13px] text-neutral-500">
          <Spinner className="size-4 text-neutral-400" />
          Dubbing…
        </span>
      }
    />
  ),
}

export const Selected: Story = {
  render: () => <DubbingNode selected />,
}
