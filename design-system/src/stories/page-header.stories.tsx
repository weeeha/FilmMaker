import type { Meta, StoryObj } from '@storybook/react-vite'
import { DownloadIcon, PlusIcon } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Custom/Page Header',
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Projects',
    description: 'Manage your projects and their settings.',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <PageHeader {...args} className="w-full max-w-2xl" />,
}

export const WithActions: Story = {
  render: (args) => (
    <PageHeader
      {...args}
      className="w-full max-w-2xl"
      actions={
        <>
          <Button variant="outline">
            <DownloadIcon /> Export
          </Button>
          <Button>
            <PlusIcon /> New project
          </Button>
        </>
      }
    />
  ),
}
