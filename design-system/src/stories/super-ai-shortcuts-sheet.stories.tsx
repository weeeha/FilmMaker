import type { Meta, StoryObj } from "@storybook/react-vite";

import ShortcutsSheetDemo from "@/components/super-ai/demos/shortcuts-sheet-demo";

const meta: Meta<typeof ShortcutsSheetDemo> = {
  title: "Super AI/Shortcuts Sheet",
  component: ShortcutsSheetDemo,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ShortcutsSheetDemo>;

export const Default: Story = {};
