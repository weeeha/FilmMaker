import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const meta = {
  title: 'AI New/Run Button/States',
  component: RunButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onRun: fn() },
} satisfies Meta<typeof RunButton>

export default meta
type Story = StoryObj<typeof meta>

const runMenu = (
  <>
    <DropdownMenuItem>Run this node</DropdownMenuItem>
    <DropdownMenuItem>Run all nodes</DropdownMenuItem>
  </>
)

/**
 * `hover` classes are written out in full for each variant: a class built at
 * runtime never reaches Tailwind, so it would generate no CSS. They paint the
 * same token the real `:hover` uses, which synthetic events cannot trigger.
 */
const states: {
  name: string
  args?: Partial<React.ComponentProps<typeof RunButton>>
  /** extra class for the split example */
  split?: string
  /** extra class for the single example */
  single?: string
  splitOnly?: boolean
}[] = [
  { name: 'Default' },
  {
    name: 'Run hover',
    split: '[&>button:first-child]:bg-run-button-hover',
    single: '[&>button]:bg-run-button-hover',
  },
  {
    name: 'Dropdown hover',
    split: '[&>button:last-child]:bg-run-button-hover',
    splitOnly: true,
  },
  { name: 'Loading', args: { loading: true } },
  { name: 'Disabled', args: { disabled: true } },
  { name: 'Dropdown open', args: { defaultMenuOpen: true }, splitOnly: true },
]

/** Every state, split (with menu) and single, side by side. */
export const AllRunButtons: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_repeat(6,minmax(0,1fr))] items-center gap-x-6 gap-y-4 pb-44">
      <span />
      {states.map(({ name }) => (
        // muted column label — --color-neutral-500
        <span key={name} className="text-center text-xs text-neutral-500">
          {name}
        </span>
      ))}

      <span className="text-xs text-neutral-500">Split</span>
      {states.map(({ name, args, split }) => (
        <div key={name} className="flex justify-center">
          <RunButton menu={runMenu} {...args} className={split} />
        </div>
      ))}

      <span className="text-xs text-neutral-500">Single</span>
      {states.map(({ name, args, single, splitOnly }) => (
        <div key={name} className="flex justify-center">
          {splitOnly ? (
            <span className="text-xs text-neutral-400">—</span>
          ) : (
            <RunButton {...args} className={single} />
          )}
        </div>
      ))}
    </div>
  ),
}

export const Default: Story = {
  args: { menu: runMenu },
}

/**
 * Hover on the Run segment — `--run-button-hover`. The dropdown segment keeps
 * `--run-button`. Painted by class because synthetic pointer events cannot
 * trigger real CSS `:hover` in the preview.
 */
export const RunHover: Story = {
  name: 'Run Hover',
  args: {
    menu: runMenu,
    className: '[&>button:first-child]:bg-run-button-hover',
  },
}

/** Hover on the dropdown segment — the Run segment stays at rest. */
export const DropdownHover: Story = {
  name: 'Dropdown Hover',
  args: {
    menu: runMenu,
    className: '[&>button:last-child]:bg-run-button-hover',
  },
}

/**
 * Menu up: only the chevron segment carries the open styling
 * (`data-state="open"` / `aria-expanded="true"`) — the Run segment stays at rest.
 */
export const DropdownOpen: Story = {
  name: 'Dropdown Open',
  args: { menu: runMenu, defaultMenuOpen: true },
}

export const Loading: Story = {
  args: { loading: true, menu: runMenu },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    menu: <DropdownMenuItem>Run this node</DropdownMenuItem>,
  },
}

/** Behaviour coverage — runs in tests, hidden from the sidebar. */
export const InteractionTest: Story = {
  tags: ['!dev', '!autodocs'],
  args: { menu: runMenu },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Run' }))
    await expect(args.onRun).toHaveBeenCalledOnce()

    // the dropdown renders in a portal, so search the whole document
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Open run options' }))
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: 'Run all nodes' })).toBeVisible()
    )
    await userEvent.keyboard('{Escape}')
  },
}

/** The two segments act independently — runs in tests, hidden from the sidebar. */
export const SegmentIndependenceTest: Story = {
  tags: ['!dev', '!autodocs'],
  args: { menu: runMenu },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const run = canvas.getByRole('button', { name: 'Run' })
    const trigger = canvas.getByRole('button', { name: 'Open run options' })

    // clicking Run does not open the menu
    await userEvent.click(run)
    await expect(args.onRun).toHaveBeenCalledOnce()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // opening the menu marks only the trigger, and does not run
    await userEvent.click(trigger)
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
    await expect(trigger).toHaveAttribute('data-state', 'open')
    await expect(run).not.toHaveAttribute('data-state', 'open')
    await expect(args.onRun).toHaveBeenCalledOnce()
    await userEvent.keyboard('{Escape}')
  },
}

/**
 * Hover styling belongs to each segment, never to the shared wrapper — tests
 * only. The rendered colours are covered by the Hover story: synthetic pointer
 * events cannot trigger real CSS `:hover` in the preview.
 */
export const HoverIsPerSegmentTest: Story = {
  tags: ['!dev', '!autodocs'],
  args: { menu: runMenu },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const run = canvas.getByRole('button', { name: 'Run' })
    const trigger = canvas.getByRole('button', { name: 'Open run options' })
    const wrapper = canvasElement.querySelector('[data-slot="run-button"]')!

    // the wrapper must not carry hover / open styling for both segments
    await expect(wrapper.className).not.toMatch(/hover:|data-\[state=open\]:/)

    // each segment owns its own hover fill, and both rest on the same black
    for (const segment of [run, trigger]) {
      await expect(segment.className).toMatch(/hover:bg-run-button-hover/)
      await expect(getComputedStyle(segment).backgroundColor).toBe(
        'oklch(0.205 0 0)'
      )
    }

    // only the trigger reacts to the menu opening
    await expect(trigger.className).toMatch(/data-\[state=open\]:bg-run-button-open/)
    await expect(run.className).not.toMatch(/data-\[state=open\]:/)
  },
}

/**
 * Activating Run swaps the label for one centered spinner without resizing the
 * control, and leaves the trigger usable — tests only.
 */
export const LoadingTest: Story = {
  tags: ['!dev', '!autodocs'],
  render: function Render(args) {
    const [running, setRunning] = useState(false)
    return (
      <RunButton
        {...args}
        loading={running}
        onRun={(event) => {
          args.onRun?.(event)
          setRunning(true)
        }}
      />
    )
  },
  args: { menu: runMenu },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const wrapper = canvasElement.querySelector('[data-slot="run-button"]')!
    const before = wrapper.getBoundingClientRect()

    await userEvent.click(canvas.getByRole('button', { name: 'Run' }))
    await expect(args.onRun).toHaveBeenCalledOnce()

    // label swapped for a single decorative spinner, no visible text
    const run = await canvas.findByRole('button', { name: 'Running' })
    await expect(run).toHaveAttribute('aria-busy', 'true')
    await expect(run).toHaveAttribute('aria-disabled', 'true')
    await expect(canvas.queryByText('Running…')).toBeNull()
    await expect(run.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(1)

    // same size before and during loading
    const after = wrapper.getBoundingClientRect()
    await expect(Math.round(after.width)).toBe(Math.round(before.width))
    await expect(Math.round(after.height)).toBe(Math.round(before.height))

    // a second activation is ignored while running
    await userEvent.click(run, { pointerEventsCheck: 0 })
    await expect(args.onRun).toHaveBeenCalledOnce()

    // the dropdown is still usable
    const trigger = canvas.getByRole('button', { name: 'Open run options' })
    await expect(trigger).toBeEnabled()
    await expect(trigger).not.toHaveAttribute('aria-busy')
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(trigger)
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: 'Run all nodes' })).toBeVisible()
    )
    await userEvent.keyboard('{Escape}')
  },
}

/** Disabled takes both segments down — tests only. */
export const DisabledBothSegmentsTest: Story = {
  tags: ['!dev', '!autodocs'],
  args: { menu: runMenu, disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Run' })).toBeDisabled()
    await expect(canvas.getByRole('button', { name: 'Open run options' })).toBeDisabled()
  },
}
