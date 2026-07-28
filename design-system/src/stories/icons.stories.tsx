import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { icons } from 'lucide-react'

import { Input } from '@/components/ui/input'

function IconGallery() {
  const [query, setQuery] = React.useState('')
  const [copied, setCopied] = React.useState<string | null>(null)
  const entries = React.useMemo(() => Object.entries(icons), [])

  const normalized = query.toLowerCase().replace(/[\s-_]/g, '')
  const filtered = normalized
    ? entries.filter(([name]) => name.toLowerCase().includes(normalized))
    : entries

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied((current) => (current === name ? null : current)), 1200)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Icons</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {entries.length.toLocaleString()} icons from{' '}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Lucide
          </a>
          , via <code className="bg-muted rounded px-1 py-0.5 text-xs">lucide-react</code>. Click an
          icon to copy its import name.
        </p>
      </div>
      <Input
        placeholder="Search icons…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-sm"
      />
      <p className="text-muted-foreground text-xs">
        {filtered.length.toLocaleString()} result{filtered.length === 1 ? '' : 's'}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-2">
        {filtered.map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            onClick={() => copyName(name)}
            title={name}
            className="hover:bg-accent hover:text-accent-foreground flex flex-col items-center gap-2 rounded-md border p-3 transition-colors"
          >
            <Icon className="size-5" />
            <span className="text-muted-foreground w-full truncate text-center text-[10px]">
              {copied === name ? 'Copied!' : name}
            </span>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm">No icons match “{query}”.</p>
      )}
    </div>
  )
}

const meta = {
  title: 'Basics/Icons',
  component: IconGallery,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof IconGallery>

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {}
