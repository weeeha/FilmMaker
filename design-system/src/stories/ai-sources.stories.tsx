import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources'

const meta = {
  title: 'AI/Sources',
  component: Sources,
  tags: ['autodocs'],
} satisfies Meta<typeof Sources>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Sources>
        <SourcesTrigger count={3} />
        <SourcesContent>
          <Source href="https://ui.shadcn.com" title="shadcn/ui" />
          <Source href="https://storybook.js.org" title="Storybook" />
          <Source href="https://tailwindcss.com" title="Tailwind CSS" />
        </SourcesContent>
      </Sources>
    </div>
  ),
}
