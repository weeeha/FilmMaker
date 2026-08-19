import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon, EllipsisIcon, Trash2Icon, TypeIcon } from 'lucide-react'

import { AINode, AINodeHeader, AINodePorts, AINodeTitle } from '@/components/ai/ai-node'
import { NodeMenu, NodeMenuAction } from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'

const meta = {
  title: 'AI New/Node Cards/Text/States',
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

const TextNodeMenu = ({ disabled = false }: { disabled?: boolean }) => (
  <NodeMenu aria-label="Text node actions">
    <NodeMenuAction aria-label="Duplicate" disabled={disabled}>
      <CopyIcon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="Delete" disabled={disabled}>
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions" disabled={disabled}>
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

const TextNode = ({
  selected = false,
  typing = false,
  disabled = false,
  defaultValue,
}: {
  selected?: boolean
  typing?: boolean
  disabled?: boolean
  defaultValue?: string
}) => (
  <div className="flex flex-col items-center gap-4">
    <AINode selected={selected} disabled={disabled} inert={!selected && !disabled ? true : undefined}>
      <AINodeHeader>
        <AINodeTitle>
          <TypeIcon aria-hidden="true" />
          Text
        </AINodeTitle>
      </AINodeHeader>
      <textarea
        aria-label="Text"
        placeholder="Enter your text..."
        defaultValue={defaultValue}
        disabled={disabled}
        // typing only happens on a selected node — the default state is display-only
        readOnly={!selected}
        tabIndex={selected ? undefined : -1}
        // autoFocus shows the caret — the "typing" state of the node
        autoFocus={typing}
        // borderless textarea filling the card — --spacing(4) inset
        className={`h-[190px] w-full resize-none rounded-b-[12px] bg-transparent p-4 text-sm text-neutral-700 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed ${
          selected ? '' : 'cursor-default caret-transparent'
        }`}
      />
      {outputPort}
    </AINode>
    <TextNodeMenu disabled={disabled} />
  </div>
)

export const Default: Story = {
  render: () => <TextNode />,
}

export const SelectedEmpty: Story = {
  name: 'Selected — Empty',
  render: () => <TextNode selected />,
}

export const SelectedTyping: Story = {
  name: 'Selected — Typing',
  render: () => <TextNode selected typing />,
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => (
    <TextNode
      selected
      defaultValue="A lone lighthouse keeper discovers the fog rolling in every night carries whispered voices from ships that vanished a century ago."
    />
  ),
}

export const Disabled: Story = {
  render: () => <TextNode disabled />,
}
