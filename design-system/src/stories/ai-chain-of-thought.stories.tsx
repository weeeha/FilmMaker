import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListChecksIcon, SearchIcon, WrenchIcon } from 'lucide-react'

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'

const meta = {
  title: 'AI/Chain of Thought',
  component: ChainOfThought,
  tags: ['autodocs'],
} satisfies Meta<typeof ChainOfThought>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Searching component documentation"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>
                shadcn/ui docs
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                Storybook guides
              </ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            icon={WrenchIcon}
            label="Composing the component structure"
            description="Combining primitives into a reusable pattern"
            status="active"
          />
          <ChainOfThoughtStep
            icon={ListChecksIcon}
            label="Writing usage examples"
            status="pending"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  ),
}
