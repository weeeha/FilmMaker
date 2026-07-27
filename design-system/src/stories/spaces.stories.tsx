import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const tailwindSteps = [
  '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56',
  '60', '64', '72', '80', '96',
]

function stepToPx(step: string): number {
  return step === 'px' ? 1 : Number(step) * 4
}

function SpacingRow({ step, note }: { step: string; note?: string }) {
  const px = stepToPx(step)
  return (
    <div className="flex items-center gap-4 border-b p-3 last:border-b-0">
      <span className="w-12 shrink-0 font-mono text-xs">{step}</span>
      <span className="text-muted-foreground w-28 shrink-0 font-mono text-[10px]">
        {step === 'px' ? '1px' : `${px / 16}rem / ${px}px`}
      </span>
      <div className="min-w-0 flex-1">
        <div className="bg-primary h-4 rounded-sm" style={{ width: px }} />
        {note && <p className="text-muted-foreground mt-1 text-xs">{note}</p>}
      </div>
    </div>
  )
}

function TailwindScale() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Tailwind spacing scale</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Spacing is derived from the base unit{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">--spacing: 0.25rem</code> (4px) —
          each step is a multiple of it. Used by{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">p-*</code>,{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">m-*</code>,{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">gap-*</code>,{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">size-*</code> and friends.
        </p>
      </div>
      <div className="rounded-lg border">
        {tailwindSteps.map((step) => (
          <SpacingRow key={step} step={step} />
        ))}
      </div>
    </div>
  )
}

const shadcnSteps = [
  { step: '0.5', note: 'Hairline gaps between menu items (gap-0.5, py-0.5)' },
  { step: '1', note: 'Compact padding inside menus, tabs and lists (p-1, py-1, gap-1)' },
  { step: '1.5', note: 'Icon-to-label gaps and small control padding (gap-1.5, px-1.5)' },
  { step: '2', note: 'The default gap in buttons, inputs and rows (gap-2, p-2) — most used step' },
  { step: '2.5', note: 'Button horizontal padding (px-2.5)' },
  { step: '3', note: 'Input and field padding (px-3)' },
  { step: '4', note: 'Content padding and section gaps (p-4, gap-4)' },
  { step: '6', note: 'Card and dialog padding (p-6, gap-6)' },
  { step: '8', note: 'Reserved space for trailing icons, large offsets (pr-8)' },
]

function ShadcnSpacing() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">shadcn/ui spacing</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          shadcn/ui components use Tailwind&apos;s scale but stick to a small set of steps. These
          are the ones the components in this library actually use, from tightest to loosest —
          reach for the same steps when composing screens to stay consistent.
        </p>
      </div>
      <div className="rounded-lg border">
        {shadcnSteps.map(({ step, note }) => (
          <SpacingRow key={step} step={step} note={note} />
        ))}
      </div>
    </div>
  )
}

const radiusTokens: {
  token: string
  className: string
  usage: string
  label?: string
}[] = [
  {
    token: '--radius-none',
    className: 'rounded-none',
    label: 'acute',
    usage: 'Square corners — tables, flush edges',
  },
  { token: '--radius-sm', className: 'rounded-sm', usage: 'Checkboxes, badges, menu items' },
  { token: '--radius-md', className: 'rounded-md', usage: 'Buttons, inputs, small controls' },
  { token: '--radius-lg', className: 'rounded-lg', usage: 'Dialogs, popovers, dropdowns' },
  { token: '--radius-xl', className: 'rounded-xl', usage: 'Cards' },
  { token: '--radius-2xl', className: 'rounded-2xl', usage: 'Large surfaces' },
  { token: '--radius-3xl', className: 'rounded-3xl', usage: 'Hero panels, feature blocks' },
  { token: '--radius-4xl', className: 'rounded-4xl', usage: 'Pill-like large shapes' },
]

function CornerSwatch({ token, className, usage, label }: (typeof radiusTokens)[number]) {
  const [value, setValue] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).borderTopLeftRadius)
    }
  }, [])

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div
        ref={ref}
        className={`bg-muted shrink-0 ${className}`}
        style={{ width: 64, height: 64, border: '2px solid var(--primary)' }}
      />
      <div className="min-w-0">
        <p className="font-mono text-xs font-medium">{label ?? className}</p>
        <p className="text-muted-foreground font-mono text-[10px]">
          {token} → {value}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">{usage}</p>
      </div>
    </div>
  )
}

function Corners() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Corners</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          All radii derive from a single token,{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">--radius: 0.625rem</code>, defined
          in <code className="bg-muted rounded px-1 py-0.5 text-xs">src/index.css</code> — the
          steps are multiples of it, so changing the base reshapes the whole system at once.
        </p>
      </div>
      <div className="grid grid-flow-col grid-rows-4 gap-3">
        {radiusTokens.map((radius) => (
          <CornerSwatch key={radius.token} {...radius} />
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: 'Basics/Spaces',
  component: TailwindScale,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TailwindScale>

export default meta
type Story = StoryObj<typeof meta>

export const TailwindSpacingScale: Story = {}

export const ShadcnSpacingStory: Story = {
  name: 'Shadcn Spacing',
  render: () => <ShadcnSpacing />,
}

export const CornersStory: Story = {
  name: 'Corners',
  render: () => <Corners />,
}
