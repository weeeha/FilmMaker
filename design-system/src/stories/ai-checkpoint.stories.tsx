import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from '@/components/ai-elements/checkpoint'

const meta = {
  title: 'AI/Checkpoint',
  component: Checkpoint,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkpoint>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Checkpoint>
        <CheckpointIcon />
        <CheckpointTrigger tooltip="Restore to this point">
          Checkpoint · 2:41 PM
        </CheckpointTrigger>
      </Checkpoint>
    </div>
  ),
}
