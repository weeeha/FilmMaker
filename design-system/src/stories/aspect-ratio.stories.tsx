import type { Meta, StoryObj } from '@storybook/react-vite'

import { AspectRatio } from '@/components/ui/aspect-ratio'

const meta = {
  title: 'Components/Aspect Ratio',
  component: AspectRatio,
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const SixteenByNine: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1} className="rounded-lg bg-muted">
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          1 : 1
        </div>
      </AspectRatio>
    </div>
  ),
}
