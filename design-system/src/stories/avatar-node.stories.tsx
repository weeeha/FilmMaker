import type { Meta, StoryObj } from '@storybook/react-vite'
import { EllipsisIcon, Trash2Icon } from 'lucide-react'

import { AINode, AINodePorts } from '@/components/ai/ai-node'
import { AvatarSparkleIcon } from '@/components/ai/avatar-sparkle-icon'
import { NodeMenu, NodeMenuAction } from '@/components/ai/node-menu'
import { NodePort } from '@/components/ai/node-port'

const meta = {
  title: 'AI New/Node/Avatar',
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
    <NodePort type="avatar" />
  </AINodePorts>
)

const AvatarNodeMenu = () => (
  <NodeMenu aria-label="Avatar node actions">
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

const AvatarNode = ({
  selected = false,
  children,
}: {
  selected?: boolean
  children?: React.ReactNode
}) => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-col gap-1.5">
      {/* node name above the card — 13px, --color-neutral-500 */}
      <span className="flex items-center gap-1.5 px-1 text-[13px] font-medium text-neutral-500 [&_svg]:size-3.5">
        <AvatarSparkleIcon />
        Avatar
      </span>
      {/* portrait card — 3:4, --radius-2xl corners */}
      <AINode
        selected={selected}
        className="h-[460px] w-[345px] shrink-0 items-center justify-center rounded-[16px]"
      >
        {children ?? (
          <div className="flex flex-col items-center gap-3 text-neutral-500">
            <AvatarSparkleIcon className="size-7" />
            <p className="text-[15px] font-medium">Select Avatar</p>
          </div>
        )}
        {outputPort}
      </AINode>
    </div>
    <AvatarNodeMenu />
  </div>
)

export const Default: Story = {
  render: () => <AvatarNode />,
}

export const Selected: Story = {
  render: () => <AvatarNode selected />,
}

export const Result: Story = {
  render: () => (
    <AvatarNode>
      {/* stand-in for the chosen avatar */}
      <div
        role="img"
        aria-label="Selected avatar"
        className="size-full rounded-[16px] bg-linear-to-b from-stone-300 via-stone-400 to-stone-600"
      />
    </AvatarNode>
  ),
}
