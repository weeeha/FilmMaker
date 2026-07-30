import type { Meta, StoryObj } from '@storybook/react-vite'
import { Play, TriangleAlert, Video } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import {
  AINode,
  AINodeFooter,
  AINodeHeader,
  AINodeMeta,
  AINodePorts,
  AINodePreview,
  AINodePrompt,
  AINodeTitle,
} from '@/components/ai/ai-node'
import { NodePort } from '@/components/ai/node-port'
import { RunButton } from '@/components/ai/run-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node/Video',
  component: AINode,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    // room for the ports floating outside the card
    (Story) => (
      <div className="px-16 py-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AINode>

export default meta
type Story = StoryObj<typeof meta>

const videoInputPorts = (
  <AINodePorts side="input">
    <NodePort type="speech" />
    <NodePort type="audio" />
    <NodePort type="image" />
    <NodePort type="text" />
  </AINodePorts>
)

const videoOutputPort = (
  <AINodePorts side="output">
    <NodePort type="video" />
  </AINodePorts>
)

const runMenu = (
  <>
    <DropdownMenuItem>Run this node</DropdownMenuItem>
    <DropdownMenuItem>Run all nodes</DropdownMenuItem>
  </>
)

const emptyPreview = (
  <>
    <Video aria-hidden="true" className="size-6 text-neutral-300" />
    <p className="text-[13px] text-neutral-400">Your generation will appear here</p>
  </>
)

export const Default: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Describe your video..." />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}

export const Selected: Story = {
  render: () => (
    <AINode selected>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Describe your video..." />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}

export const TypingDescription: Story = {
  render: () => (
    <AINode selected>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Describe your video..." />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'A slow cinematic drone shot over a foggy forest')
    await expect(prompt).toHaveValue('A slow cinematic drone shot over a foggy forest')
  },
}

export const Generating: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        <Spinner className="size-6 text-neutral-400" />
        <p className="text-[13px] text-neutral-400">Generating…</p>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your video..."
          defaultValue="A slow cinematic drone shot over a foggy forest"
          disabled
        />
        <RunButton loading menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}

export const Result: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        {/* stand-in for the generated clip */}
        <div
          role="img"
          aria-label="Generated video preview"
          className="flex size-full items-center justify-center bg-linear-to-br from-neutral-700 to-neutral-500"
        >
          <Play aria-hidden="true" className="size-8 text-white/90" />
        </div>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your video..."
          defaultValue="A slow cinematic drone shot over a foggy forest"
        />
        <RunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}

export const Error: Story = {
  render: () => (
    <AINode>
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>
        <TriangleAlert aria-hidden="true" className="size-6 text-destructive" />
        <p role="status" className="text-[13px] text-destructive">
          Generation failed. Try again.
        </p>
      </AINodePreview>
      <AINodeFooter>
        <AINodePrompt
          placeholder="Describe your video..."
          defaultValue="A slow cinematic drone shot over a foggy forest"
        />
        <RunButton label="Retry" menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}

export const Disabled: Story = {
  render: () => (
    <AINode className="opacity-60">
      <AINodeHeader>
        <AINodeTitle>
          <Video aria-hidden="true" />
          Video
        </AINodeTitle>
        <AINodeMeta>Veo 3.1 Fast</AINodeMeta>
      </AINodeHeader>
      <AINodePreview>{emptyPreview}</AINodePreview>
      <AINodeFooter>
        <AINodePrompt placeholder="Describe your video..." disabled />
        <RunButton disabled menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
  ),
}
