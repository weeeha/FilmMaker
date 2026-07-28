import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const meta = {
  title: 'Components/Sonner (Toast)',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => toast('Undone'),
              },
            })
          }
        >
          Show toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success('Changes saved successfully')}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error('Something went wrong')}
        >
          Error
        </Button>
      </div>
    </div>
  ),
}
