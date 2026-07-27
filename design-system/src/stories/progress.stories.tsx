import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '@/components/ui/progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 40,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-80" />,
}

export const Animated: Story = {
  render: function Render() {
    const [progress, setProgress] = useState(13)
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
    return <Progress value={progress} className="w-80" />
  },
}
