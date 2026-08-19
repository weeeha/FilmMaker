import type { Meta, StoryObj } from "@storybook/react-vite";

import KbdDemo from "@/components/super-ai/demos/kbd-demo";

const meta: Meta<typeof KbdDemo> = {
  title: "Super AI/Kbd",
  component: KbdDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof KbdDemo>;

export const Default: Story = {};
