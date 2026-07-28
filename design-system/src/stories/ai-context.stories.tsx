import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextTrigger,
} from '@/components/ai-elements/context'

const meta = {
  title: 'AI/Context',
  component: Context,
  tags: ['autodocs'],
} satisfies Meta<typeof Context>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Context maxTokens={200000} usedTokens={64000}>
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
        </ContextContentBody>
      </ContextContent>
    </Context>
  ),
}
