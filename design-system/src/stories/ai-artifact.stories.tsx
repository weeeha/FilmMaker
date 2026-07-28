import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon, DownloadIcon, XIcon } from 'lucide-react'

import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from '@/components/ai-elements/artifact'

const meta = {
  title: 'AI/Artifact',
  component: Artifact,
  tags: ['autodocs'],
} satisfies Meta<typeof Artifact>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Artifact className="w-full max-w-xl">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Quarterly report summary</ArtifactTitle>
          <ArtifactDescription>Generated 2 minutes ago</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={CopyIcon} label="Copy" tooltip="Copy content" />
          <ArtifactAction
            icon={DownloadIcon}
            label="Download"
            tooltip="Download file"
          />
          <ArtifactAction icon={XIcon} label="Close" tooltip="Close artifact" />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="text-sm text-muted-foreground">
        Revenue grew 12.5% quarter over quarter, driven primarily by the new
        enterprise tier. Customer acquisition slowed by 8%, which warrants a
        review of the current marketing mix.
      </ArtifactContent>
    </Artifact>
  ),
}
