import type { Meta, StoryObj } from '@storybook/react-vite'

import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'

const suggestions = [
  'What is a design system?',
  'Show me the button variants',
  'How do I add a new component?',
  'Generate a dashboard prototype',
]

const meta = {
  title: 'AI/Suggestion',
  component: Suggestions,
  tags: ['autodocs'],
} satisfies Meta<typeof Suggestions>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Suggestions>
        {suggestions.map((suggestion) => (
          <Suggestion key={suggestion} suggestion={suggestion} />
        ))}
      </Suggestions>
    </div>
  ),
}
