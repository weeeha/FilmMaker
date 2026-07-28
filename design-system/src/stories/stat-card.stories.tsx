import type { Meta, StoryObj } from '@storybook/react-vite'

import { StatCard } from '@/components/stat-card'

const meta = {
  title: 'Custom/Stat Card',
  component: StatCard,
  tags: ['autodocs'],
  args: {
    label: 'Total Revenue',
    value: '$1,250.00',
    trend: 12.5,
    hint: 'Trending up this month',
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <StatCard {...args} className="w-72" />,
}

export const TrendingDown: Story = {
  args: {
    label: 'New Customers',
    value: '1,234',
    trend: -20,
    hint: 'Down 20% this period',
  },
  render: (args) => <StatCard {...args} className="w-72" />,
}

export const Minimal: Story = {
  args: {
    label: 'Active Accounts',
    value: '45,678',
    trend: undefined,
    hint: undefined,
  },
  render: (args) => <StatCard {...args} className="w-72" />,
}

export const Row: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
      <StatCard label="Total Revenue" value="$1,250.00" trend={12.5} />
      <StatCard label="New Customers" value="1,234" trend={-20} />
      <StatCard label="Active Accounts" value="45,678" trend={4.5} />
    </div>
  ),
}
