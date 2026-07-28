import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'

const meta = {
  title: 'AI/Reasoning',
  component: Reasoning,
  tags: ['autodocs'],
} satisfies Meta<typeof Reasoning>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Reasoning defaultOpen duration={4} isStreaming={false}>
        <ReasoningTrigger />
        <ReasoningContent>
          {`The user is asking about design systems. Let me consider what to cover:

1. First I should define the core concept
2. Then list the main building blocks
3. Finally give a practical example they can relate to`}
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
}

export const Streaming: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Reasoning defaultOpen isStreaming>
        <ReasoningTrigger />
        <ReasoningContent>
          {`Analyzing the request and gathering relevant context...`}
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
}
