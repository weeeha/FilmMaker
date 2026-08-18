import type { Meta, StoryObj } from "@storybook/react-vite";

import GenSettingsBarDemo from "@/components/super-ai/demos/gen-settings-bar-demo";

const meta: Meta<typeof GenSettingsBarDemo> = {
  title: "Super AI/Gen Settings Bar",
  component: GenSettingsBarDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof GenSettingsBarDemo>;

export const Default: Story = {};
