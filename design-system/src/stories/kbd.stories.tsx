import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>⌘K</Kbd>,
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Press <Kbd>⌘</Kbd> + <Kbd>B</Kbd> to toggle the sidebar.
    </p>
  ),
}
