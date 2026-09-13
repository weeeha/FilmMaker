import { useState } from 'react'
import {
  AudioLines,
  AudioWaveform,
  Brain,
  ClapperboardIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  GemIcon,
  ImageIcon,
  Music,
  SparklesIcon,
  Trash2Icon,
  ZapIcon,
} from 'lucide-react'

import { AvatarSparkleIcon } from '@/components/ai/avatar-sparkle-icon'
import {
  NodeMenu,
  NodeMenuAction,
  NodeMenuSelect,
  NodeMenuSelectContent,
  NodeMenuSelectGroup,
  NodeMenuSelectItem,
  NodeMenuSelectTrigger,
  NodeMenuSeparator,
} from '@/components/ai/node-menu'
import { ModelPicker, OptionSelect, SoundToggle } from './shared'

/**
 * Every node card's menu, in one place. The node stories and the
 * `AI New/Node Menu` stories both render these, so a menu never drifts
 * from the node it belongs to.
 */

/* ---------------------------------------------------------------- helpers */

/** Single-value pill with a labelled dropdown and a chevron. */
const PillSelect = ({
  label,
  options,
  defaultValue,
  chevron = false,
}: {
  label: string
  options: string[]
  defaultValue: string
  chevron?: boolean
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label={label} chevron={chevron || undefined}>
        {value}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label={label}>
        <NodeMenuSelectGroup value={value} onValueChange={setValue}>
          {options.map((option) => (
            <NodeMenuSelectItem key={option} value={option}>
              {option}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

const languages = [
  { value: 'Spanish', flag: '🇪🇸' },
  { value: 'French', flag: '🇫🇷' },
  { value: 'German', flag: '🇩🇪' },
  { value: 'Japanese', flag: '🇯🇵' },
  { value: 'Polish', flag: '🇵🇱' },
]

const LanguageSelect = () => {
  const [language, setLanguage] = useState('Spanish')
  const selected = languages.find((l) => l.value === language)
  return (
    <NodeMenuSelect>
      <NodeMenuSelectTrigger aria-label="Target language" chevron>
        <span aria-hidden="true">{selected?.flag}</span>
        {selected?.value}
      </NodeMenuSelectTrigger>
      <NodeMenuSelectContent label="Target language">
        <NodeMenuSelectGroup value={language} onValueChange={setLanguage}>
          {languages.map((l) => (
            <NodeMenuSelectItem key={l.value} value={l.value}>
              <span aria-hidden="true">{l.flag}</span>
              {l.value}
            </NodeMenuSelectItem>
          ))}
        </NodeMenuSelectGroup>
      </NodeMenuSelectContent>
    </NodeMenuSelect>
  )
}

/** Download · Delete · More — the action tail most menus end with. */
const ActionTail = ({ download = true }: { download?: boolean }) => (
  <>
    {download && (
      <NodeMenuAction aria-label="Download">
        <DownloadIcon />
      </NodeMenuAction>
    )}
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </>
)

/* ------------------------------------------------------------ node menus */

export const VideoNodeMenu = () => (
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
    <ActionTail />
  </NodeMenu>
)

export const ImageNodeMenu = () => (
  <NodeMenu aria-label="Image node settings">
    <ModelPicker
      heading="Image models"
      defaultValue="gpt-image-2"
      models={[
        {
          value: 'gpt-image-2',
          name: 'GPT Image 2',
          description: 'Sharp text rendering, strong prompt following.',
          icon: <SparklesIcon />,
        },
        {
          value: 'flux-1-1',
          name: 'FLUX 1.1',
          description: 'Fast, photorealistic, great for iterations.',
          icon: <ZapIcon />,
        },
        {
          value: 'seedream-4',
          name: 'Seedream 4.0',
          description: 'Stylized art direction and consistent characters.',
          icon: <ImageIcon />,
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
      options={['512', '1K', '2K', '4K']}
      defaultValue="1K"
    />
    <OptionSelect
      label="Quality"
      options={['Low', 'Medium', 'High']}
      defaultValue="Medium"
      icon={<GemIcon aria-hidden="true" />}
    />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const LLMNodeMenu = () => (
  <NodeMenu aria-label="LLM node settings">
    <ModelPicker
      heading="Language models"
      defaultValue="gpt-5"
      models={[
        {
          value: 'gpt-5',
          name: 'GPT-5',
          description: 'Strong general reasoning and writing.',
          icon: <SparklesIcon />,
        },
        {
          value: 'claude-sonnet-5',
          name: 'Claude Sonnet 5',
          description: 'Nuanced long-form writing and analysis.',
          icon: <Brain />,
        },
        {
          value: 'gemini-3-pro',
          name: 'Gemini 3 Pro',
          description: 'Fast, multimodal, long context.',
          icon: <ZapIcon />,
        },
      ]}
    />
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Duplicate">
      <CopyIcon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

export const AvatarNodeMenu = () => (
  <NodeMenu aria-label="Avatar node settings">
    <ModelPicker
      heading="Avatars"
      defaultValue="maya"
      models={[
        {
          value: 'maya',
          name: 'Maya',
          description: 'Warm presenter, studio lighting.',
          icon: <AvatarSparkleIcon />,
        },
        {
          value: 'kai',
          name: 'Kai',
          description: 'Casual explainer, outdoor scenes.',
          icon: <AvatarSparkleIcon />,
        },
        {
          value: 'nova',
          name: 'Nova',
          description: 'Editorial look, high contrast.',
          icon: <AvatarSparkleIcon />,
        },
      ]}
    />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const LipSyncNodeMenu = () => (
  <NodeMenu aria-label="Lip Sync node settings">
    <PillSelect
      label="Model"
      options={['Creatify Aurora', 'Sync Labs v2', 'HeyGen Avatar IV']}
      defaultValue="Creatify Aurora"
      chevron
    />
    <PillSelect
      label="Resolution"
      options={['480p', '720p', '1080p', '4K']}
      defaultValue="720p"
    />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const SpeechNodeMenu = () => (
  <NodeMenu aria-label="Text to Speech node settings">
    <PillSelect
      label="Model"
      options={['Eleven Multilingual v2', 'Eleven Turbo v2.5', 'Eleven Flash v2.5']}
      defaultValue="Eleven Multilingual v2"
      chevron
    />
    <NodeMenuSeparator />
    <ActionTail download={false} />
  </NodeMenu>
)

export const MusicNodeMenu = () => (
  <NodeMenu aria-label="Music node settings">
    <ModelPicker
      heading="Music models"
      defaultValue="music-v2"
      models={[
        {
          value: 'music-v2',
          name: 'Music v2',
          description: 'Full tracks with vocals, lyrics-aware.',
          icon: <Music />,
        },
        {
          value: 'lyria-2',
          name: 'Lyria 2',
          description: 'Instrumental scoring, cinematic beds.',
          icon: <SparklesIcon />,
        },
      ]}
    />
    <PillSelect
      label="Duration"
      options={['Auto', '0:30', '1:00', '2:00', '3:00']}
      defaultValue="Auto"
    />
    <NodeMenuSeparator />
    <ActionTail download={false} />
  </NodeMenu>
)

export const SoundEffectsNodeMenu = () => (
  <NodeMenu aria-label="Sound effects node settings">
    <ModelPicker
      heading="Audio models"
      defaultValue="lyria-2"
      models={[
        {
          value: 'lyria-2',
          name: 'Lyria 2',
          description: 'Rich, layered sound design from text.',
          icon: <AudioLines />,
        },
        {
          value: 'eleven-sfx',
          name: 'Eleven SFX',
          description: 'Short, punchy effects with precise timing.',
          icon: <ZapIcon />,
        },
      ]}
    />
    <OptionSelect
      label="Duration"
      options={['Auto', '1s', '5s', '10s', '22s']}
      defaultValue="Auto"
    />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const VoiceChangerNodeMenu = () => (
  <NodeMenu aria-label="Voice changer node settings">
    <ModelPicker
      heading="Voice models"
      defaultValue="eleven-v3"
      models={[
        {
          value: 'eleven-v3',
          name: 'Eleven v3',
          description: 'Most expressive voice conversion.',
          icon: <AudioWaveform />,
        },
        {
          value: 'eleven-multilingual-v2',
          name: 'Eleven Multilingual v2',
          description: 'Stable conversion across 29 languages.',
          icon: <SparklesIcon />,
        },
      ]}
    />
    <OptionSelect
      label="Voice"
      options={['Rachel', 'Adam', 'Bella', 'Josh']}
      defaultValue="Rachel"
    />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const VoiceIsolatorNodeMenu = () => (
  <NodeMenu aria-label="Voice isolator node actions">
    <ActionTail />
  </NodeMenu>
)

export const DubbingNodeMenu = () => (
  <NodeMenu aria-label="Dubbing node settings">
    <LanguageSelect />
    <NodeMenuSeparator />
    <ActionTail />
  </NodeMenu>
)

export const CompositionNodeMenu = () => (
  <NodeMenu aria-label="Composition node actions">
    <NodeMenuAction aria-label="Download">
      <DownloadIcon />
    </NodeMenuAction>
    <NodeMenuSeparator />
    <NodeMenuAction aria-label="Delete">
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions">
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)

export const TextNodeMenu = ({ disabled = false }: { disabled?: boolean }) => (
  <NodeMenu aria-label="Text node actions">
    <NodeMenuAction aria-label="Duplicate" disabled={disabled}>
      <CopyIcon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="Delete" disabled={disabled}>
      <Trash2Icon />
    </NodeMenuAction>
    <NodeMenuAction aria-label="More actions" disabled={disabled}>
      <EllipsisIcon />
    </NodeMenuAction>
  </NodeMenu>
)
