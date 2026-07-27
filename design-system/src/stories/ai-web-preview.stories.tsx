import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewUrl,
} from '@/components/ai-elements/web-preview'

const meta = {
  title: 'AI/Web Preview',
  component: WebPreview,
  tags: ['autodocs'],
} satisfies Meta<typeof WebPreview>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <WebPreview
      defaultUrl="https://example.com"
      className="h-96 w-full max-w-2xl"
    >
      <WebPreviewNavigation>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
    </WebPreview>
  ),
}
