import type { Meta, StoryObj } from '@storybook/react-vite'

import { NodePort, type NodePortType } from '@/components/ai/node-port'

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
        'speech',
        'audio',
        'sound',
        '3d',
        'avatar',
        'start-frame',
        'end-frame',
        'text',
      ],
    },
    tooltip: { control: 'boolean' },
  },
} satisfies Meta<typeof NodePort>

export default meta
type Story = StoryObj<typeof meta>

const allTypes: { type: NodePortType; name: string }[] = [
  { type: 'video', name: 'Video' },
  { type: 'image', name: 'Image' },
  { type: 'speech', name: 'Speech' },
  { type: 'audio', name: 'Audio' },
  { type: 'sound', name: 'Sound' },
  { type: '3d', name: '3D' },
  { type: 'avatar', name: 'Avatar' },
  { type: 'start-frame', name: 'Start frame' },
  { type: 'end-frame', name: 'End frame' },
  { type: 'text', name: 'Text' },
]

export const AllPorts: Story = {
  args: { type: 'video' },
  render: () => (
    <div className="flex items-start gap-4">
      {allTypes.map(({ type, name }) => (
        <div key={type} className="flex w-14 flex-col items-center gap-2">
          <NodePort type={type} />
          {/* muted row label — --color-neutral-500 */}
          <span className="text-center text-xs text-neutral-500">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Video: Story = {
  args: { type: 'video' },
}

export const Image: Story = {
  args: { type: 'image' },
}

export const Speech: Story = {
  args: { type: 'speech' },
}

export const Audio: Story = {
  args: { type: 'audio' },
}

export const Sound: Story = {
  args: { type: 'sound' },
}

export const ThreeD: Story = {
  name: '3D',
  args: { type: '3d' },
}

export const Avatar: Story = {
  args: { type: 'avatar' },
}

export const StartFrame: Story = {
  name: 'Start Frame',
  args: { type: 'start-frame' },
}

export const EndFrame: Story = {
  name: 'End Frame',
  args: { type: 'end-frame' },
}

export const Text: Story = {
  args: { type: 'text' },
}
