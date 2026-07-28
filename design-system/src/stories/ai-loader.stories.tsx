import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loader } from '@/components/ai-elements/loader'
import { Shimmer } from '@/components/ai-elements/shimmer'

const meta = {
  title: 'AI/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <Loader />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} />
    </div>
  ),
}

export const ShimmerText: Story = {
  render: () => <Shimmer>Thinking about your request...</Shimmer>,
}
