import type { Meta, StoryObj } from '@storybook/react-vite'

import { Bubble, BubbleContent, BubbleGroup } from '@/components/ui/bubble'

const meta = {
  title: 'Chat/Bubble',
  component: Bubble,
  tags: ['autodocs'],
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>Hello! This is a chat bubble.</BubbleContent>
    </Bubble>
  ),
}

export const Variants: Story = {
  render: () => (
    <BubbleGroup className="w-96">
      {(
        [
          'default',
          'secondary',
          'muted',
          'tinted',
          'outline',
          'destructive',
        ] as const
      ).map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>This is the {variant} variant.</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const Alignment: Story = {
  render: () => (
    <BubbleGroup className="w-96">
      <Bubble variant="muted">
        <BubbleContent>Incoming message</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Outgoing message</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}
