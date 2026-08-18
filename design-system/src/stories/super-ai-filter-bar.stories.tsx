import type { Meta, StoryObj } from "@storybook/react-vite";

import FilterBarDemo from "@/components/super-ai/demos/filter-bar-demo";

const meta: Meta<typeof FilterBarDemo> = {
  title: "Super AI/Filter Bar",
  component: FilterBarDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof FilterBarDemo>;

export const Default: Story = {};
