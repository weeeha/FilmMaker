import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Plan,
  PlanContent,
  PlanDescription,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '@/components/ai-elements/plan'

const meta = {
  title: 'AI/Plan',
  component: Plan,
  tags: ['autodocs'],
} satisfies Meta<typeof Plan>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <Plan defaultOpen>
        <PlanHeader>
          <div>
            <PlanTitle>Build the settings page</PlanTitle>
            <PlanDescription>3 steps · ~10 minutes</PlanDescription>
          </div>
          <PlanTrigger />
        </PlanHeader>
        <PlanContent>
          <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
            <li>Create the profile form with name, bio, and language.</li>
            <li>Add the notifications card with switches.</li>
            <li>Wire up a story and verify in Storybook.</li>
          </ol>
        </PlanContent>
      </Plan>
    </div>
  ),
}
