import type { Meta, StoryObj } from '@storybook/react-vite'

import { Bubble, BubbleContent } from '@/components/ui/bubble'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'

const messages = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  align: i % 3 === 0 ? ('end' as const) : ('start' as const),
  text: `Message number ${i + 1} in this conversation.`,
}))

const meta = {
  title: 'Chat/Message Scroller',
  component: MessageScroller,
  tags: ['autodocs'],
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-96 w-96 rounded-lg border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {messages.map((message) => (
              <MessageScrollerItem key={message.id}>
                <Bubble
                  variant={message.align === 'end' ? 'default' : 'muted'}
                  align={message.align}
                >
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
}
