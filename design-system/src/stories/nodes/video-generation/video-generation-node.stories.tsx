import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClapperboardIcon, DownloadIcon, EllipsisIcon, Play, SparklesIcon, Trash2Icon, TriangleAlert, Video, ZapIcon } from 'lucide-react'
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
import { NodeMenu, NodeMenuAction, NodeMenuSeparator } from '@/components/ai/node-menu'
import { DemoRunButton, ModelPicker, OptionSelect, SoundToggle } from '../shared'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'AI New/Node Cards/Video Generation/States',
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
  <>
    <AINodePorts side="input">
      <NodePort type="speech" />
      <NodePort type="audio" />
      <NodePort type="image" />
    </AINodePorts>
    {/* text in — next to the prompt input */}
    <AINodePorts side="input" className="top-[353px] translate-y-0">
      <NodePort type="text" />
    </AINodePorts>
  </>
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

const VideoNodeMenu = () => (
  <NodeMenu aria-label="Video node settings">
    <ModelPicker
      heading="Video models"
      defaultValue="veo-3-1-fast"
      models={[
        {
          value: 'veo-3-1-fast',
          name: 'Veo 3.1 Fast',
          description: 'Fast, cost-efficient, audio-backed, up to 4K.',
          icon: <ZapIcon />,
        },
        {
          value: 'seedance-2',
          name: 'Seedance 2.0',
          description: 'Next-gen realism, high prompt control.',
          icon: <ClapperboardIcon />,
        },
        {
          value: 'gemini-omni-flash',
          name: 'Gemini Omni Flash',
          description: 'Physics-aware, consistent, audio-backed.',
          icon: <SparklesIcon />,
        },
      ]}
    />
    <OptionSelect
      label="Aspect Ratio"
      options={['21:9', '16:9', '4:3', '1:1', '3:4', '9:16']}
      defaultValue="16:9"
    />
    <OptionSelect
      label="Resolution"
      options={['480p', '720p', '1080p', '4K']}
      defaultValue="720p"
    />
    <OptionSelect
      label="Duration"
      options={['4s', '5s', '6s', '7s', '8s', '9s', '10s', '11s', '12s', '13s', '14s', '15s']}
      defaultValue="4s"
    />
    <SoundToggle />
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Download">
      <DownloadIcon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
    <AINode inert>
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
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const Selected: Story = {
  name: 'Selected — Empty',
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const TypingDescription: Story = {
  name: 'Selected — Typing',
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prompt = canvas.getByRole('textbox', { name: 'Prompt' })
    await userEvent.type(prompt, 'A slow cinematic drone shot over a foggy forest')
    await expect(prompt).toHaveValue('A slow cinematic drone shot over a foggy forest')
  },
}

export const SelectedFilled: Story = {
  name: 'Selected — Filled',
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <AINodePrompt
          placeholder="Describe your video..."
          defaultValue="A slow cinematic drone shot over a foggy forest"
        />
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const Generating: Story = {
  name: 'Generating — In Process',
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <DemoRunButton loading menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const Generated: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <DemoRunButton menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const GeneratedError: Story = {
  name: 'Generated — Error',
  render: () => (
    <div className="flex flex-col items-center gap-4">
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
        <DemoRunButton label="Retry" menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
    <AINode disabled>
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
        <DemoRunButton disabled menu={runMenu} />
      </AINodeFooter>
      {videoInputPorts}
      {videoOutputPort}
    </AINode>
      <VideoNodeMenu />
    </div>
  ),
}
