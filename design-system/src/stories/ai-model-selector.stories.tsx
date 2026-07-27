import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorName,
  ModelSelectorTrigger,
} from '@/components/ai-elements/model-selector'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'AI/Model Selector',
  component: ModelSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof ModelSelector>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ModelSelector>
      <ModelSelectorTrigger asChild>
        <Button variant="outline">Select model</Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="Search models..." />
        <ModelSelectorList>
          <ModelSelectorGroup heading="Anthropic">
            <ModelSelectorItem value="claude-sonnet-5">
              <ModelSelectorName>Claude Sonnet 5</ModelSelectorName>
            </ModelSelectorItem>
            <ModelSelectorItem value="claude-opus-4-8">
              <ModelSelectorName>Claude Opus 4.8</ModelSelectorName>
            </ModelSelectorItem>
            <ModelSelectorItem value="claude-haiku-4-5">
              <ModelSelectorName>Claude Haiku 4.5</ModelSelectorName>
            </ModelSelectorItem>
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  ),
}
