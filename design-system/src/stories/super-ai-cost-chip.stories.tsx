import type { Meta, StoryObj } from "@storybook/react-vite";

import CostChipDemo from "@/components/super-ai/demos/cost-chip-demo";

const meta: Meta<typeof CostChipDemo> = {
  title: "Super AI/Cost Chip",
  component: CostChipDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof CostChipDemo>;

export const Default: Story = {};
