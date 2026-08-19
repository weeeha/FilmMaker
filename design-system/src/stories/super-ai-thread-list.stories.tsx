import type { Meta, StoryObj } from "@storybook/react-vite";

import ThreadListDemo from "@/components/super-ai/demos/thread-list-demo";

const meta: Meta<typeof ThreadListDemo> = {
  title: "Super AI/Thread List",
  component: ThreadListDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ThreadListDemo>;

export const Default: Story = {};
