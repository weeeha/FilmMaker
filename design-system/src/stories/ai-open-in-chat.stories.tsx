import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInItem,
  OpenInLabel,
  OpenInScira,
  OpenInSeparator,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from "@/components/ai-elements/open-in-chat";

const meta: Meta<typeof OpenIn> = {
  title: "AI/Open in Chat",
  component: OpenIn,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof OpenIn>;

export const Default: Story = {
  render: () => (
    <OpenIn query="Write a 20-second marketing video script for an analytics dashboard">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInLabel>Open this prompt in</OpenInLabel>
        <OpenInItem disabled>Chat apps</OpenInItem>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInT3 />
        <OpenInScira />
        <OpenInSeparator />
        <OpenInLabel>Builders</OpenInLabel>
        <OpenInv0 />
        <OpenInCursor />
      </OpenInContent>
    </OpenIn>
  ),
};
