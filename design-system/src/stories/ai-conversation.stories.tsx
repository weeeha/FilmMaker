import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquareIcon } from 'lucide-react'

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'

const meta = {
  title: 'AI/Conversation',
  component: Conversation,
  tags: ['autodocs'],
} satisfies Meta<typeof Conversation>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Conversation className="h-96 w-full max-w-xl rounded-lg border">
      <ConversationContent>
        <Message from="user">
          <MessageContent>
            Can you explain what a design system is?
          </MessageContent>
        </Message>
        <Message from="assistant">
          <MessageContent>
            <MessageResponse>
              {`A **design system** is a collection of reusable components, guided by clear standards, that can be assembled to build applications.

It typically includes:

1. **Component library** — buttons, inputs, dialogs
2. **Design tokens** — colors, spacing, typography
3. **Documentation** — usage guidelines and examples`}
            </MessageResponse>
          </MessageContent>
        </Message>
        <Message from="user">
          <MessageContent>Great, and how does Storybook help?</MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Conversation className="h-72 w-full max-w-xl rounded-lg border">
      <ConversationContent>
        <ConversationEmptyState
          icon={<MessageSquareIcon className="size-8" />}
          title="Start a conversation"
          description="Ask anything to begin chatting."
        />
      </ConversationContent>
    </Conversation>
  ),
}
