"use client";

import { useCallback, useMemo } from "react";
import {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import RoadmapNode from "@/components/RoadmapNode";

interface RoadmapFlowProps {
  nodes: Node[];
  edges: Edge[];
}

export default function RoadmapFlow({ nodes, edges }: RoadmapFlowProps) {
  const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      input: (props: any) => <RoadmapNode {...props} type="input" />,
      default: (props: any) => <RoadmapNode {...props} type="default" />,
      output: (props: any) => <RoadmapNode {...props} type="output" />,
    }),
    []
  );

  return (
    <div className="w-full h-[600px] border rounded-lg bg-white shadow-inner">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: "#6366f1" },
          type: "smoothstep",
        }}
      >
        <Controls className="bg-white border shadow-lg" />
        <MiniMap
          className="bg-white border shadow-lg"
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "#10b981";
              case "output":
                return "#8b5cf6";
              default:
                return "#3b82f6";
            }
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#e5e7eb"
        />
      </ReactFlow>
    </div>
  );
}
