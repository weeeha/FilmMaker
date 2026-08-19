import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ReactFlowProvider,
  type Edge as FlowEdge,
  type Node as FlowNode,
  type NodeProps as FlowNodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
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
 * `Panel` is a positioned overlay pinned to a corner of the Canvas (via the
 * `position` prop: top-left / top-right / bottom-left / bottom-right). Use it
 * for titles, legends, or action toolbars that float above the flow. It must
 * render inside the Canvas / ReactFlowProvider.
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

const nodes: FlowNode[] = [
  {
    id: "prompt",
    type: "workflow",
    position: { x: 0, y: 80 },
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
      description: "Decompose into steps",
      handles: { target: true, source: true },
    },
  },
  {
    id: "review",
    type: "workflow",
    position: { x: 420, y: 200 },
    data: {
      title: "Review",
      description: "Verify & finalize",
      handles: { target: true, source: false },
    },
  },
];

const edges: FlowEdge[] = [
  { id: "e1", source: "prompt", target: "plan", type: "animated" },
  { id: "e2", source: "prompt", target: "review", type: "animated" },
];

const meta: Meta<typeof Panel> = {
  title: "AI/Panel",
  component: Panel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: 460 }}>
      <ReactFlowProvider>
        <Canvas
          edgeTypes={edgeTypes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodes={nodes}
        >
          <Panel position="top-left">
            <span className="px-2 font-medium text-sm">Image agent</span>
          </Panel>
          <Panel position="top-right">
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost">
                <Play className="size-4" />
                Run
              </Button>
              <Button size="icon" variant="ghost">
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </Panel>
          <Controls />
        </Canvas>
      </ReactFlowProvider>
    </div>
  ),
};
