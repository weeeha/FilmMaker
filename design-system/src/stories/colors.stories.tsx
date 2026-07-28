import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

type TokenGroup = {
  label: string
  tokens: string[]
}

const groups: TokenGroup[] = [
  { label: 'Base', tokens: ['background', 'foreground'] },
  { label: 'Brand', tokens: ['primary', 'primary-foreground', 'secondary', 'secondary-foreground'] },
  {
    label: 'Surfaces',
    tokens: ['card', 'card-foreground', 'popover', 'popover-foreground'],
  },
  {
    label: 'States',
    tokens: ['muted', 'muted-foreground', 'accent', 'accent-foreground', 'destructive'],
  },
  { label: 'Lines & focus', tokens: ['border', 'input', 'ring'] },
  { label: 'Charts', tokens: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] },
  {
    label: 'Sidebar',
    tokens: [
      'sidebar',
      'sidebar-foreground',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-accent',
      'sidebar-accent-foreground',
      'sidebar-border',
      'sidebar-ring',
    ],
  },
]

function Swatch({ token }: { token: string }) {
  const [value, setValue] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).getPropertyValue(`--${token}`).trim())
    }
  }, [token])

  return (
    <div ref={ref} className="flex items-center gap-3 rounded-md border p-2">
      <div
        className="size-10 shrink-0 rounded-md border"
        style={{ backgroundColor: `var(--${token})` }}
      />
      <div className="min-w-0">
        <p className="truncate font-mono text-xs font-medium">--{token}</p>
        <p className="text-muted-foreground truncate font-mono text-[10px]">{value}</p>
      </div>
    </div>
  )
}

function ColorPalette() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Semantic colors</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Theme tokens defined in <code className="bg-muted rounded px-1 py-0.5 text-xs">src/index.css</code>.
          Each token has a light and dark value; toggle the theme to compare.
        </p>
      </div>
      {groups.map((group) => (
        <section key={group.label} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">{group.label}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-2">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

const libraryColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
]

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function LibrarySwatch({ color, shade }: { color: string; shade: number }) {
  const [copied, setCopied] = React.useState(false)
  const token = `--color-${color}-${shade}`

  const copyValue = () => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      type="button"
      onClick={copyValue}
      title={copied ? 'Copied!' : `${color}-${shade} — click to copy value`}
      className="focus-visible:ring-ring/50 h-10 min-w-0 flex-1 rounded-md border transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
      style={{ backgroundColor: `var(${token})` }}
    >
      <span className="sr-only">{copied ? 'Copied!' : `${color}-${shade}`}</span>
    </button>
  )
}

function TailwindLibrary() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Tailwind color library</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          The full Tailwind CSS palette that shadcn/ui themes are built from — every scale in
          shades 50–950, available as{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">--color-*</code> variables and
          utility classes like{' '}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">bg-blue-500</code>. Click a swatch
          to copy its oklch value.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-20 shrink-0" />
          {shades.map((shade) => (
            <span
              key={shade}
              className="text-muted-foreground min-w-0 flex-1 text-center font-mono text-[10px]"
            >
              {shade}
            </span>
          ))}
        </div>
        {libraryColors.map((color) => (
          <div key={color} className="flex items-center gap-1.5">
            <span className="w-20 shrink-0 font-mono text-xs">{color}</span>
            {shades.map((shade) => (
              <LibrarySwatch key={shade} color={color} shade={shade} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const meta = {
  title: 'Basics/Color Palette',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const TailwindColorLibrary: Story = {
  render: () => <TailwindLibrary />,
}

export const Semantics: Story = {}
