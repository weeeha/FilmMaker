import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReactFlowProvider,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Copy, Play, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeDescription,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";
import { Toolbar } from "@/components/ai-elements/toolbar";

/**
 * `Toolbar` wraps ReactFlow's NodeToolbar — a floating action bar anchored to a
 * specific node (positioned below it by default). It renders inside a custom
 * node and is normally shown when the node is selected; here `isVisible` is
 * forced on for the first node so the toolbar is always visible in the story.
 */

type WorkflowData = {
  title: string;
  description: string;
  toolbar?: boolean;
  handles: { target: boolean; source: boolean };
};

const WorkflowNode = ({ data }: FlowNodeProps) => {
  const { title, description, toolbar, handles } =
    data as unknown as WorkflowData;
  return (
    <>
      {toolbar && (
        <Toolbar isVisible>
          <Button size="sm" variant="ghost">
            <Play className="size-4" />
            Run
          </Button>
          <Button size="icon" variant="ghost">
            <Copy className="size-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="size-4" />
          </Button>
        </Toolbar>
      )}
      <Node handles={handles}>
        <NodeHeader>
          <NodeTitle>{title}</NodeTitle>
          <NodeDescription>{description}</NodeDescription>
        </NodeHeader>
      </Node>
    </>
  );
};

const nodeTypes = { workflow: WorkflowNode };
const edgeTypes = { animated: Edge.Animated };

const nodes: FlowNode[] = [
  {
    id: "image",
    type: "workflow",
    position: { x: 0, y: 60 },
    data: {
      title: "Generate image",
      description: "Toolbar shown below this node",
      toolbar: true,
      handles: { target: false, source: true },
    },
  },
  {
    id: "review",
    type: "workflow",
    position: { x: 460, y: 60 },
    data: {
      title: "Review",
      description: "Select a node to reveal its toolbar",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "image", target: "review", type: "animated" },
];

const meta: Meta<typeof Toolbar> = {
  title: "AI/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 440 }}>
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
