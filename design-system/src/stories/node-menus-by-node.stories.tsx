import type { Meta, StoryObj } from '@storybook/react-vite'

import { NodeMenu } from '@/components/ai/node-menu'
import {
  AvatarNodeMenu,
  CompositionNodeMenu,
  DubbingNodeMenu,
  ImageNodeMenu,
  LLMNodeMenu,
  LipSyncNodeMenu,
  MusicNodeMenu,
  SoundEffectsNodeMenu,
  SpeechNodeMenu,
  TextNodeMenu,
  VideoNodeMenu,
  VoiceChangerNodeMenu,
  VoiceIsolatorNodeMenu,
} from './nodes/menus'

const meta = {
  title: 'AI New/Node Menu/By Node',
  component: NodeMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NodeMenu>

export default meta
type Story = StoryObj

const menus = [
  { name: 'Video Generation', Menu: VideoNodeMenu },
  { name: 'Image Generation', Menu: ImageNodeMenu },
  { name: 'LLM', Menu: LLMNodeMenu },
  { name: 'Text', Menu: TextNodeMenu },
  { name: 'Avatar', Menu: AvatarNodeMenu },
  { name: 'Lip Sync', Menu: LipSyncNodeMenu },
  { name: 'Text to Speech', Menu: SpeechNodeMenu },
  { name: 'Music', Menu: MusicNodeMenu },
  { name: 'Sound Effects', Menu: SoundEffectsNodeMenu },
  { name: 'Voice Changer', Menu: VoiceChangerNodeMenu },
  { name: 'Voice Isolator', Menu: VoiceIsolatorNodeMenu },
  { name: 'Dubbing', Menu: DubbingNodeMenu },
  { name: 'Composition', Menu: CompositionNodeMenu },
]

/** Every node's menu, in the order the nodes appear under Node Cards. */
export const AllNodeMenus: Story = {
  render: () => (
    <div className="flex flex-col gap-6 py-4">
      {menus.map(({ name, Menu }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          {/* muted row label — --color-neutral-500 */}
          <span className="text-xs text-neutral-500">{name}</span>
          <Menu />
        </div>
      ))}
    </div>
  ),
}

export const VideoGeneration: Story = { render: () => <VideoNodeMenu /> }
export const ImageGeneration: Story = { render: () => <ImageNodeMenu /> }
export const LLM: Story = { render: () => <LLMNodeMenu /> }
export const Text: Story = { render: () => <TextNodeMenu /> }
export const Avatar: Story = { render: () => <AvatarNodeMenu /> }
export const LipSync: Story = { name: 'Lip Sync', render: () => <LipSyncNodeMenu /> }
export const TextToSpeech: Story = {
  name: 'Text to Speech',
  render: () => <SpeechNodeMenu />,
}
export const Music: Story = { render: () => <MusicNodeMenu /> }
export const SoundEffects: Story = {
  name: 'Sound Effects',
  render: () => <SoundEffectsNodeMenu />,
}
export const VoiceChanger: Story = {
  name: 'Voice Changer',
  render: () => <VoiceChangerNodeMenu />,
}
export const VoiceIsolator: Story = {
  name: 'Voice Isolator',
  render: () => <VoiceIsolatorNodeMenu />,
}
export const Dubbing: Story = { render: () => <DubbingNodeMenu /> }
export const Composition: Story = { render: () => <CompositionNodeMenu /> }
