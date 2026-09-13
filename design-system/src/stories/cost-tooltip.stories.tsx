import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { CostTooltip } from '@/components/ai/cost-tooltip'
import { RunButton } from '@/components/ai/run-button'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'AI New/Cost Tooltip/States',
  component: CostTooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    cost: { control: { type: 'number', min: 0 } },
  },
} satisfies Meta<typeof CostTooltip>

export default meta
type Story = StoryObj<typeof meta>

const types: { name: string; cost: number; note: string }[] = [
  { name: 'Free', cost: 0, note: 'spends nothing' },
  { name: 'Charged', cost: 2950, note: 'spends credits' },
]

/** Both types, open at rest so the wording can be compared side by side. */
export const AllCostTooltips: Story = {
  args: { cost: 0, children: null },
  render: () => (
    <div className="flex gap-24 pt-16">
      {types.map(({ name, cost, note }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <CostTooltip cost={cost} defaultOpen>
            <Button className="h-(--run-button-height) text-(length:--run-button-label)">
              Run
            </Button>
          </CostTooltip>
          {/* muted label — --color-neutral-500 */}
          <span className="text-xs text-neutral-500">
            {name} — {note}
          </span>
        </div>
      ))}
    </div>
  ),
}

/** A run that spends nothing. */
export const Free: Story = {
  args: { cost: 0, children: null },
  render: () => (
    <CostTooltip cost={0} defaultOpen>
      <Button className="h-(--run-button-height) text-(length:--run-button-label)">
        Run
      </Button>
    </CostTooltip>
  ),
}

/** A run that spends credits — thousands are grouped. */
export const Charged: Story = {
  args: { cost: 2950, children: null },
  render: () => (
    <CostTooltip cost={2950} defaultOpen>
      <Button className="h-(--run-button-height) text-(length:--run-button-label)">
        Run
      </Button>
    </CostTooltip>
  ),
}

/** On the Run Button, where the tooltip is actually used. */
export const OnRunButton: Story = {
  name: 'On Run Button',
  args: { cost: 2950, children: null },
  render: () => <RunButton cost={2950} menu={<span />} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.hover(canvas.getByRole('button', { name: 'Run' }))
    await waitFor(() =>
      expect(
        body.getAllByText('This run will cost 2,950 credits')[0]
      ).toBeVisible()
    )
  },
}

/** Singular at 1, and the type flag each tooltip carries — tests only. */
export const TypesTest: Story = {
  tags: ['!dev', '!autodocs'],
  args: { cost: 1, children: null },
  render: () => (
    <div className="flex gap-8">
      <CostTooltip cost={1} defaultOpen>
        <Button>One</Button>
      </CostTooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() =>
      expect(body.getAllByText('This run will cost 1 credit')[0]).toBeVisible()
    )
    const tip = canvasElement.ownerDocument.querySelector(
      '[data-slot="cost-tooltip"]'
    )
    await expect(tip).toHaveAttribute('data-type', 'charged')
  },
}
