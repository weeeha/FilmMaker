import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoIcon } from 'lucide-react'

import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker'

const meta = {
  title: 'Components/Marker',
  component: Marker,
  tags: ['autodocs'],
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Marker className="w-96">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Chat started at 9:41 AM</MarkerContent>
    </Marker>
  ),
}

export const Separator: Story = {
  render: () => (
    <Marker variant="separator" className="w-96">
      <MarkerContent>Today</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  render: () => (
    <Marker variant="border" className="w-96">
      <MarkerContent>Unread messages</MarkerContent>
    </Marker>
  ),
}
