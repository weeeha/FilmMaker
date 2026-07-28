import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlobeIcon, PaperclipIcon } from 'lucide-react'

import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'

const meta = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PromptInput>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <PromptInput className="w-full max-w-xl" onSubmit={() => {}}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask me anything..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputButton aria-label="Attach file">
            <PaperclipIcon className="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <GlobeIcon className="size-4" /> Search
          </PromptInputButton>
          <PromptInputSelect defaultValue="claude-sonnet-5">
            <PromptInputSelectTrigger>
              <PromptInputSelectValue placeholder="Model" />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              <PromptInputSelectItem value="claude-sonnet-5">
                Claude Sonnet 5
              </PromptInputSelectItem>
              <PromptInputSelectItem value="claude-opus-4-8">
                Claude Opus 4.8
              </PromptInputSelectItem>
              <PromptInputSelectItem value="claude-haiku-4-5">
                Claude Haiku 4.5
              </PromptInputSelectItem>
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
}
