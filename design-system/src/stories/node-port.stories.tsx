import type { Meta, StoryObj } from '@storybook/react-vite'

import { NodePort } from '@/components/ai/node-port'

const meta = {
  title: 'AI New/Node Port',
  component: NodePort,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'video',
        'image',
        'audio',
        'speech',
        'sound',
        '3d',
        'avatar',
        'start-frame',
        'end-frame',
        'text',
        'link',
      ],
    },
  },
} satisfies Meta<typeof NodePort>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { type: 'video' },
}

export const AllTypes: Story = {
  args: { type: 'video' },
  render: () => (
    <div className="flex items-center gap-3">
      <NodePort type="video" />
      <NodePort type="image" />
      <NodePort type="speech" />
      <NodePort type="audio" />
      <NodePort type="sound" />
      <NodePort type="3d" />
      <NodePort type="avatar" />
      <NodePort type="start-frame" />
      <NodePort type="end-frame" />
      <NodePort type="text" />
      <NodePort type="link" />
    </div>
  ),
}
