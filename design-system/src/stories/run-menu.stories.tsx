import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { RunMenu } from '@/components/ai/run-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const meta = {
  title: 'AI New/Run Menu/States',
  component: RunMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: (
      <>
        <DropdownMenuItem>Run this node</DropdownMenuItem>
        <DropdownMenuItem>Run all nodes</DropdownMenuItem>
      </>
    ),
  },
} satisfies Meta<typeof RunMenu>

export default meta
type Story = StoryObj<typeof meta>

const states: {
  name: string
  args?: Partial<React.ComponentProps<typeof RunMenu>>
}[] = [
  { name: 'Default' },
  // written out in full: a class built at runtime never reaches Tailwind
  { name: 'Hover', args: { className: 'bg-run-button-hover' } },
  { name: 'Open', args: { defaultOpen: true } },
  { name: 'Disabled', args: { disabled: true } },
]

/** Every state of the trigger. Open also flips the chevron. */
export const AllRunMenus: Story = {
  render: () => (
    <div className="flex items-start gap-10 pb-32">
      {states.map(({ name, args }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <RunMenu {...args}>
            <DropdownMenuItem>Run this node</DropdownMenuItem>
            <DropdownMenuItem>Run all nodes</DropdownMenuItem>
          </RunMenu>
          {/* muted label — --color-neutral-500 */}
          <span className="text-xs text-neutral-500">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Default: Story = {}

/** Hover fill — `--run-button-hover`, the same token the split button uses. */
export const Hover: Story = {
  args: { className: 'bg-run-button-hover' },
}

/** Open: the trigger keeps the active fill and the chevron points up. */
export const Open: Story = {
  args: { defaultOpen: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // an open menu marks the rest of the page aria-hidden
    const trigger = canvas.getByRole('button', {
      name: 'Open run options',
      hidden: true,
    })
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const chevron = trigger.querySelector('svg')!
    await waitFor(() =>
      expect(getComputedStyle(chevron).transform).toContain('matrix(-1, 0, 0, -1')
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

/** Attached: leading corners squared so it can sit against a primary action. */
export const Attached: Story = {
  args: { attached: true },
}

/** Opening and closing flips the chevron back — tests only. */
export const ChevronFlipTest: Story = {
  tags: ['!dev', '!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open run options' })
    const chevron = trigger.querySelector('svg')!
    const rotation = () => getComputedStyle(chevron).transform

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    const atRest = rotation()

    await userEvent.click(trigger)
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
    await waitFor(() => expect(rotation()).not.toBe(atRest))

    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await waitFor(() => expect(rotation()).toBe(atRest))
  },
}
