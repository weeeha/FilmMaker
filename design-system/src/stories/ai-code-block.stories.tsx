import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block'

const exampleCode = `import { Button } from '@/components/ui/button'

export function Example() {
  return <Button variant="outline">Click me</Button>
}`

const meta = {
  title: 'AI/Code Block',
  component: CodeBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <CodeBlock code={exampleCode} language="tsx">
        <CodeBlockCopyButton />
      </CodeBlock>
    </div>
  ),
}
