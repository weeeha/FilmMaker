import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon, SendIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const meta = {
  title: 'Components/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupTextarea placeholder="Send a message..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="sm" className="ml-auto" aria-label="Send">
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
