import type { Meta, StoryObj } from "@storybook/react-vite";

import FieldRowDemo from "@/components/super-ai/demos/field-row-demo";

const meta: Meta<typeof FieldRowDemo> = {
  title: "Super AI/Field Row",
  component: FieldRowDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof FieldRowDemo>;

export const Default: Story = {};
