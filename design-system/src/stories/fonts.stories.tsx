import type { Meta, StoryObj } from '@storybook/react-vite'

const scale = [
  { label: 'text-xs', className: 'text-xs', size: '0.75rem / 12px' },
  { label: 'text-sm', className: 'text-sm', size: '0.875rem / 14px' },
  { label: 'text-base', className: 'text-base', size: '1rem / 16px' },
  { label: 'text-lg', className: 'text-lg', size: '1.125rem / 18px' },
  { label: 'text-xl', className: 'text-xl', size: '1.25rem / 20px' },
  { label: 'text-2xl', className: 'text-2xl', size: '1.5rem / 24px' },
  { label: 'text-3xl', className: 'text-3xl', size: '1.875rem / 30px' },
  { label: 'text-4xl', className: 'text-4xl', size: '2.25rem / 36px' },
  { label: 'text-5xl', className: 'text-5xl', size: '3rem / 48px' },
]

const weights = [
  { label: 'font-light', className: 'font-light', value: 300 },
  { label: 'font-normal', className: 'font-normal', value: 400 },
  { label: 'font-medium', className: 'font-medium', value: 500 },
  { label: 'font-semibold', className: 'font-semibold', value: 600 },
  { label: 'font-bold', className: 'font-bold', value: 700 },
  { label: 'font-black', className: 'font-black', value: 900 },
]

const pangram = 'The quick brown fox jumps over the lazy dog'

function Fonts() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Fonts</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          The design system uses <strong>Geist Variable</strong> (via{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">@fontsource-variable/geist</code>)
          for both headings and body text, exposed as{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">font-sans</code> and{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">font-heading</code>.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Specimen</h2>
        <div className="rounded-lg border p-6">
          <p className="text-4xl font-semibold tracking-tight">Geist Variable</p>
          <p className="text-muted-foreground mt-3 text-lg">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !?&amp;@#%
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Type scale</h2>
        <div className="flex flex-col divide-y rounded-lg border">
          {scale.map((step) => (
            <div key={step.label} className="flex items-baseline gap-6 p-4">
              <div className="w-24 shrink-0">
                <p className="font-mono text-xs">{step.label}</p>
                <p className="text-muted-foreground font-mono text-[10px]">{step.size}</p>
              </div>
              <p className={`${step.className} truncate`}>{pangram}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Weights</h2>
        <div className="flex flex-col divide-y rounded-lg border">
          {weights.map((weight) => (
            <div key={weight.label} className="flex items-baseline gap-6 p-4">
              <div className="w-24 shrink-0">
                <p className="font-mono text-xs">{weight.label}</p>
                <p className="text-muted-foreground font-mono text-[10px]">{weight.value}</p>
              </div>
              <p className={`${weight.className} truncate text-lg`}>{pangram}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Body copy</h2>
        <div className="rounded-lg border p-6">
          <h3 className="font-heading text-xl font-semibold">Building with the system</h3>
          <p className="mt-2 leading-7">
            Components inherit the sans-serif stack by default, so body copy renders in Geist at a
            comfortable reading size. Use <code className="bg-muted rounded px-1 py-0.5 text-xs">text-muted-foreground</code>{' '}
            for supporting text.
          </p>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            Muted supporting text sits one step down in both size and contrast, keeping hierarchy
            clear without extra rules.
          </p>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Basics/Fonts',
  component: Fonts,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Fonts>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
