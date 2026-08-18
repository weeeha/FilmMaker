import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@/components/ai-elements/confirmation";

const meta: Meta<typeof Confirmation> = {
  title: "AI/Confirmation",
  component: Confirmation,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

// The Confirmation component reads AI SDK v6 tool states via casts, so we
// pass the raw state strings the source checks for ("approval-requested",
// "output-available") through `state` and a static `approval` object.

export const AwaitingApproval: Story = {
  render: () => (
    <div className="w-[460px]">
      <Confirmation
        approval={{ id: "approve-render" }}
        state={"approval-requested" as never}
      >
        <ConfirmationTitle>
          The assistant wants to spend 12 render credits to generate the final
          1080p marketing video. Approve?
        </ConfirmationTitle>
        <ConfirmationRequest>
          <ConfirmationActions>
            <ConfirmationAction variant="outline">Deny</ConfirmationAction>
            <ConfirmationAction>Approve</ConfirmationAction>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

export const Approved: Story = {
  render: () => (
    <div className="w-[460px]">
      <Confirmation
        approval={{ id: "approve-render", approved: true }}
        state={"output-available" as never}
      >
        <ConfirmationTitle>
          Render approved — generating the final 1080p marketing video.
        </ConfirmationTitle>
        <ConfirmationAccepted>
          <p className="text-muted-foreground text-sm">
            You spent 12 render credits. Estimated time: 40 seconds.
          </p>
        </ConfirmationAccepted>
      </Confirmation>
    </div>
  ),
};

export const Rejected: Story = {
  render: () => (
    <div className="w-[460px]">
      <Confirmation
        approval={{ id: "approve-render", approved: false }}
        state={"output-available" as never}
      >
        <ConfirmationTitle>
          Render request was declined.
        </ConfirmationTitle>
        <ConfirmationRejected>
          <p className="text-muted-foreground text-sm">
            No credits were spent. Adjust the script and try again.
          </p>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};
