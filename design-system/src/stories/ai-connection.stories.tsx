import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  addEdge,
  ReactFlowProvider,
  type Connection as FlowConnection,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import * as React from "react";

import { Canvas } from "@/components/ai-elements/canvas";
import { Connection } from "@/components/ai-elements/connection";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";
import { Panel } from "@/components/ai-elements/panel";

/**
 * `Connection` is a ReactFlow `connectionLineComponent`: the line drawn while
 * the user drags from a source handle to create a new edge. To see it, drag
 * from the right-side handle of a node toward another node's left handle —
 * the custom animated bezier with a leading dot follows the cursor, and on
 * drop a new animated edge is committed via onConnect.
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
const edgeTypes = { animated: Edge.Animated };

const initialNodes: FlowNode[] = [
  {
    id: "prompt",
    type: "workflow",
    position: { x: 0, y: 120 },
    data: {
      title: "User prompt",
      description: "Drag from my right handle →",
      handles: { target: false, source: true },
    },
  },
  {
    id: "plan",
    type: "workflow",
    position: { x: 420, y: 0 },
    data: {
      title: "Plan",
      description: "Connect me to anything",
      handles: { target: true, source: true },
    },
  },
  {
    id: "image",
    type: "workflow",
    position: { x: 420, y: 240 },
    data: {
      title: "Generate image",
      description: "Drop a connection here",
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

const initialEdges: FlowEdge[] = [
  { id: "e-prompt-plan", source: "prompt", target: "plan", type: "animated" },
];

const InteractiveCanvas = () => {
  const [nodes] = React.useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = React.useState<FlowEdge[]>(initialEdges);

  const onConnect = React.useCallback((connection: FlowConnection) => {
    setEdges((current) =>
      addEdge({ ...connection, type: "animated" }, current)
    );
  }, []);

  return (
    <Canvas
      connectionLineComponent={Connection}
      edgeTypes={edgeTypes}
      edges={edges}
      nodeTypes={nodeTypes}
      nodes={nodes}
      onConnect={onConnect}
    >
      <Panel position="top-left">
        Drag between handles to draw a connection
      </Panel>
    </Canvas>
  );
};

const meta: Meta = {
  title: "AI/Connection",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 480 }}>
      <ReactFlowProvider>
        <InteractiveCanvas />
      </ReactFlowProvider>
    </div>
  ),
};
