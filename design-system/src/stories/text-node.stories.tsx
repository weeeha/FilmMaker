import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon, EllipsisIcon, Trash2Icon } from 'lucide-react'

import { AINode, AINodePorts } from '@/components/ai/ai-node'
import { NodeMenu, NodeMenuAction } from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'

const meta = {
  title: 'AI New/Node/Text',
  component: AINode,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    // room for the port floating outside the card
    (Story) => (
      <div className="px-16 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AINode>

export default meta
type Story = StoryObj<typeof meta>

const outputPort = (
  <AINodePorts side="output">
    <NodePort type="text" />
  </AINodePorts>
)

const TextNodeMenu = () => (
  <NodeMenu aria-label="Text node actions">
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

const TextNode = ({
  selected = false,
  defaultValue,
}: {
  selected?: boolean
  defaultValue?: string
}) => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-col gap-1.5">
      {/* node name label above the card — 13px, --color-neutral-500 */}
      <span className="px-0.5 text-[13px] font-medium text-neutral-500">
        Text
      </span>
      <AINode selected={selected} className="h-[230px] shrink-0">
        <textarea
          aria-label="Text"
          placeholder="Enter your text..."
          defaultValue={defaultValue}
          // borderless textarea filling the card — --spacing(4) inset
          className="size-full resize-none rounded-[12px] bg-transparent p-4 text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
        />
        {outputPort}
      </AINode>
    </div>
    <TextNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <TextNode />,
}

export const Filled: Story = {
  render: () => (
    <TextNode defaultValue="A lone lighthouse keeper discovers the fog rolling in every night carries whispered voices from ships that vanished a century ago." />
  ),
}

export const Selected: Story = {
  render: () => <TextNode selected />,
}
