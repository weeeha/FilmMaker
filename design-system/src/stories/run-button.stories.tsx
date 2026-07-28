import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const meta = {
  title: 'AI New/Run Button',
  component: RunButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onRun: fn() },
} satisfies Meta<typeof RunButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menu: (
      <>
        <DropdownMenuItem>Run this node</DropdownMenuItem>
        <DropdownMenuItem>Run all nodes</DropdownMenuItem>
      </>
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Run' }))
    await expect(args.onRun).toHaveBeenCalledOnce()

    // the dropdown renders in a portal, so search the whole document
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Run options' }))
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: 'Run all nodes' })).toBeVisible()
    )
    await userEvent.keyboard('{Escape}')
  },
}

export const WithoutMenu: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    loading: true,
    menu: <DropdownMenuItem>Run this node</DropdownMenuItem>,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    menu: <DropdownMenuItem>Run this node</DropdownMenuItem>,
  },
}
