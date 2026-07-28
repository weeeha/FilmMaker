import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'

const meta = {
  title: 'AI/Tool',
  component: Tool,
  tags: ['autodocs'],
} satisfies Meta<typeof Tool>

export default meta
type Story = StoryObj

export const Completed: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Tool defaultOpen>
        <ToolHeader type="tool-web_search" state="output-available" />
        <ToolContent>
          <ToolInput input={{ query: 'latest Storybook version' }} />
          <ToolOutput
            errorText={undefined}
            output={
              <div className="p-3 text-sm">
                Storybook 10.5 is the latest stable release.
              </div>
            }
          />
        </ToolContent>
      </Tool>
    </div>
  ),
}

export const Running: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Tool>
        <ToolHeader type="tool-fetch_docs" state="input-available" />
      </Tool>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Tool defaultOpen>
        <ToolHeader type="tool-database_query" state="output-error" />
        <ToolContent>
          <ToolInput input={{ table: 'users', limit: 10 }} />
          <ToolOutput output={undefined} errorText="Connection timed out after 30s" />
        </ToolContent>
      </Tool>
    </div>
  ),
}
