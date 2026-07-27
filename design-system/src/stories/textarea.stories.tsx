import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type your message here.',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="textarea-message">Your message</Label>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => <Textarea {...args} disabled className="w-80" />,
}
