import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRightIcon, MailIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const allVariants = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
] as const

export const AllButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {allVariants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 text-sm text-muted-foreground">{variant}</span>
          <div className="flex items-center gap-2">
            <Button variant={variant} size="sm">
              Small
            </Button>
            <Button variant={variant}>Default</Button>
            <Button variant={variant} size="lg">
              Large
            </Button>
            <Button variant={variant} size="icon" aria-label="Send email">
              <MailIcon />
            </Button>
            <Button variant={variant}>
              <MailIcon /> With icon
            </Button>
            <Button variant={variant} disabled>
              <Spinner /> Loading
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Default: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Link: Story = {
  args: { variant: 'link' },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <MailIcon /> Send email <ArrowRightIcon />
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Spinner /> Please wait
      </>
    ),
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Send">
        <MailIcon />
      </Button>
    </div>
  ),
}
