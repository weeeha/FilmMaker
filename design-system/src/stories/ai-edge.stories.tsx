import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReactFlowProvider,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";

/**
 * `Edge` exports two custom edge renderers:
 *  - Edge.Animated  — a bezier edge with a dot animating along the path.
 *  - Edge.Temporary — a dashed bezier edge (e.g. for proposed / pending links).
 * Both are registered through ReactFlow's `edgeTypes` and referenced by an
 * edge's `type` field. Edge.Animated reads node positions from the store, so
 * it requires the ReactFlowProvider.
 */

type WorkflowData = {
  title: string;
  description: string;
  handles: { target: boolean; source: boolean };
};

const WorkflowNode = ({ data }: FlowNodeProps) => {
  const { title, description, handles } = data as unknown as WorkflowData;
  return (
    <Node handles={handles}>
      <NodeHeader>
        <NodeTitle>{title}</NodeTitle>
        <NodeDescription>{description}</NodeDescription>
      </NodeHeader>
    </Node>
  );
};

const nodeTypes = { workflow: WorkflowNode };
const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

const nodes: FlowNode[] = [
  {
    id: "prompt",
    type: "workflow",
    position: { x: 0, y: 120 },
    data: {
      title: "User prompt",
      description: "Inbound request",
      handles: { target: false, source: true },
    },
  },
  {
    id: "plan",
    type: "workflow",
    position: { x: 420, y: 0 },
    data: {
      title: "Plan",
      description: "Committed edge (animated)",
      handles: { target: true, source: true },
    },
  },
  {
    id: "image",
    type: "workflow",
    position: { x: 420, y: 240 },
    data: {
      title: "Generate image",
      description: "Proposed edge (temporary)",
      handles: { target: true, source: true },
    },
  },
  {
    id: "review",
    type: "workflow",
    position: { x: 840, y: 120 },
    data: {
      title: "Review",
      description: "Verify & finalize",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  // Solid, animated edges = confirmed connections.
  { id: "e-prompt-plan", source: "prompt", target: "plan", type: "animated" },
  { id: "e-plan-review", source: "plan", target: "review", type: "animated" },
  // Dashed temporary edges = proposed / pending connections.
  { id: "e-prompt-image", source: "prompt", target: "image", type: "temporary" },
  { id: "e-image-review", source: "image", target: "review", type: "temporary" },
];

const meta: Meta = {
  title: "AI/Edge",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 480 }}>
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
