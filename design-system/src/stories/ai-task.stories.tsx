import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from '@/components/ai-elements/task'

const meta = {
  title: 'AI/Task',
  component: Task,
  tags: ['autodocs'],
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Task defaultOpen>
        <TaskTrigger title="Scaffolding the component library" />
        <TaskContent>
          <TaskItem>
            Created <TaskItemFile>src/components/ui/button.tsx</TaskItemFile>
          </TaskItem>
          <TaskItem>
            Added stories in{' '}
            <TaskItemFile>src/stories/button.stories.tsx</TaskItemFile>
          </TaskItem>
          <TaskItem>Ran the Storybook test suite — 126 passing</TaskItem>
        </TaskContent>
      </Task>
    </div>
  ),
}
