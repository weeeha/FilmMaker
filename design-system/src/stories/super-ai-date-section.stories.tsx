import type { Meta, StoryObj } from "@storybook/react-vite";

import DateSectionDemo from "@/components/super-ai/demos/date-section-demo";

const meta: Meta<typeof DateSectionDemo> = {
  title: "Super AI/Date Section",
  component: DateSectionDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DateSectionDemo>;

export const Default: Story = {};
