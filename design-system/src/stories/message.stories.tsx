import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message'

const meta = {
  title: 'Chat/Message',
  component: Message,
  tags: ['autodocs'],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = {
  render: () => (
    <MessageGroup className="w-96">
      <Message>
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Alex</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Hey! How is the design system going?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>
              Great! All components are documented in Storybook now.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
