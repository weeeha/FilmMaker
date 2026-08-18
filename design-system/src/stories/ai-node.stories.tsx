import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReactFlowProvider,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CheckCircle2, ImageIcon, ListTree, MessageSquare } from "lucide-react";
import type { ComponentType } from "react";

import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeAction,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";

/**
 * Node is a Card-based custom node for @xyflow/react. It renders its own
 * source/target Handles based on the `handles` prop and is composed from
 * NodeHeader / NodeTitle / NodeDescription / NodeAction / NodeContent /
 * NodeFooter. It is registered via ReactFlow's `nodeTypes`.
 */

type WorkflowData = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: string;
  body: string;
  handles: { target: boolean; source: boolean };
};

const WorkflowNode = ({ data }: FlowNodeProps) => {
  const { icon: Icon, title, description, status, body, handles } =
    data as unknown as WorkflowData;
  return (
    <Node handles={handles}>
      <NodeHeader>
        <NodeTitle className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </NodeTitle>
        <NodeDescription>{description}</NodeDescription>
        <NodeAction className="text-muted-foreground text-xs">
          {status}
        </NodeAction>
      </NodeHeader>
      <NodeContent>
        <p className="text-muted-foreground text-sm">{body}</p>
      </NodeContent>
      <NodeFooter className="text-muted-foreground text-xs">
        gpt-image-1 · 1.2s
      </NodeFooter>
    </Node>
  );
};

const nodeTypes = { workflow: WorkflowNode };
const edgeTypes = { animated: Edge.Animated };

const nodes: FlowNode[] = [
  {
    id: "prompt",
    type: "workflow",
    position: { x: 0, y: 40 },
    data: {
      icon: MessageSquare,
      title: "User prompt",
      description: "Inbound request",
      status: "done",
      body: "“Create a poster for a jazz night and summarize the brief.”",
      handles: { target: false, source: true },
    },
  },
  {
    id: "plan",
    type: "workflow",
    position: { x: 460, y: 0 },
    data: {
      icon: ListTree,
      title: "Plan",
      description: "Decompose into steps",
      status: "done",
      body: "1. Draft copy · 2. Generate artwork · 3. Compose layout.",
      handles: { target: true, source: true },
    },
  },
  {
    id: "image",
    type: "workflow",
    position: { x: 460, y: 280 },
    data: {
      icon: ImageIcon,
      title: "Generate image",
      description: "Render artwork",
      status: "running",
      body: "Producing a 1024×1536 poster from the visual brief.",
      handles: { target: true, source: true },
    },
  },
  {
    id: "review",
    type: "workflow",
    position: { x: 920, y: 140 },
    data: {
      icon: CheckCircle2,
      title: "Review",
      description: "Verify & finalize",
      status: "queued",
      body: "Validate the output against the original request.",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "prompt", target: "plan", type: "animated" },
  { id: "e2", source: "prompt", target: "image", type: "animated" },
  { id: "e3", source: "plan", target: "review", type: "animated" },
  { id: "e4", source: "image", target: "review", type: "animated" },
];

const meta: Meta<typeof Node> = {
  title: "AI/Node",
  component: Node,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Node>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 520 }}>
      <ReactFlowProvider>
        <Canvas
          edgeTypes={edgeTypes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodes={nodes}
        />
      </ReactFlowProvider>
    </div>
  ),
};
