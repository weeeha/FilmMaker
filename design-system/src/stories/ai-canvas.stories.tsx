import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReactFlowProvider,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Canvas } from "@/components/ai-elements/canvas";
import { Controls } from "@/components/ai-elements/controls";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";
import { Panel } from "@/components/ai-elements/panel";

/**
 * The Canvas wraps @xyflow/react's ReactFlow. It MUST live inside a
 * <ReactFlowProvider> and a parent element with an explicit width/height,
 * otherwise the flow renders nothing.
 */

type WorkflowData = {
  title: string;
  description: string;
  handles: { target: boolean; source: boolean };
};

// A custom node type built from the project's Node card component.
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
const edgeTypes = { animated: Edge.Animated };

const initialNodes: FlowNode[] = [
  {
    id: "prompt",
    type: "workflow",
    position: { x: 0, y: 120 },
    data: {
      title: "User prompt",
      description: "“Create a poster for a jazz night”",
      handles: { target: false, source: true },
    },
  },
  {
    id: "plan",
    type: "workflow",
    position: { x: 380, y: 0 },
    data: {
      title: "Plan",
      description: "Break the request into ordered steps",
      handles: { target: true, source: true },
    },
  },
  {
    id: "image",
    type: "workflow",
    position: { x: 380, y: 220 },
    data: {
      title: "Generate image",
      description: "Render artwork from the brief",
      handles: { target: true, source: true },
    },
  },
  {
    id: "review",
    type: "workflow",
    position: { x: 760, y: 120 },
    data: {
      title: "Review",
      description: "Check the result and finalize",
      handles: { target: true, source: false },
    },
  },
];

const initialEdges: FlowEdge[] = [
  { id: "e-prompt-plan", source: "prompt", target: "plan", type: "animated" },
  { id: "e-prompt-image", source: "prompt", target: "image", type: "animated" },
  { id: "e-plan-review", source: "plan", target: "review", type: "animated" },
  { id: "e-image-review", source: "image", target: "review", type: "animated" },
];

const meta: Meta<typeof Canvas> = {
  title: "AI/Canvas",
  component: Canvas,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Canvas>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 480 }}>
      <ReactFlowProvider>
        <Canvas
          edgeTypes={edgeTypes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          nodes={initialNodes}
        >
          <Controls />
          <Panel position="top-left">Agent workflow</Panel>
        </Canvas>
      </ReactFlowProvider>
    </div>
  ),
};
