import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "@/components/ai-elements/image";

const meta: Meta<typeof Image> = {
  title: "AI/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Image>;

// A small inline SVG (base64-encoded) standing in for an AI-generated frame.
const base64 =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiB2aWV3Qm94PSIwIDAgNDAwIDIyNSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjN2MzYWVkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiIGZpbGw9InVybCgjZykiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HZW5lcmF0ZWQgRnJhbWU8L3RleHQ+PC9zdmc+";

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Image
        alt="Generated marketing video keyframe"
        base64={base64}
        mediaType="image/svg+xml"
        uint8Array={new Uint8Array()}
      />
    </div>
  ),
};
