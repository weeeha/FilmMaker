import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    type: 'text',
    placeholder: 'Type something...',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Email: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-email">Email</Label>
      <Input id="input-email" type="email" placeholder="m@example.com" />
    </div>
  ),
}

export const File: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-file">Picture</Label>
      <Input id="input-file" type="file" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled' },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Invalid value' },
}
