import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Queue,
  QueueItem,
  QueueItemContent,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from '@/components/ai-elements/queue'

const meta = {
  title: 'AI/Queue',
  component: Queue,
  tags: ['autodocs'],
} satisfies Meta<typeof Queue>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Queue>
        <QueueSection defaultOpen>
          <QueueSectionTrigger>
            <QueueSectionLabel count={3} label="Queued tasks" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              <QueueItem>
                <QueueItemContent className="flex items-center gap-2">
                  <QueueItemIndicator completed />
                  Generate button stories
                </QueueItemContent>
              </QueueItem>
              <QueueItem>
                <QueueItemContent className="flex items-center gap-2">
                  <QueueItemIndicator completed />
                  Build dashboard prototype
                </QueueItemContent>
              </QueueItem>
              <QueueItem>
                <QueueItemContent className="flex items-center gap-2">
                  <QueueItemIndicator />
                  Publish AI components block
                </QueueItemContent>
              </QueueItem>
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  ),
}
