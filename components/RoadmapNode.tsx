"use client";

import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Target, Award } from "lucide-react";

interface NodeData {
  title: string;
  description: string;
  link?: string;
}

interface RoadmapNodeProps {
  data: NodeData;
  type: "input" | "default" | "output";
}

const getNodeIcon = (type: string) => {
  switch (type) {
    case "input":
      return <Target className="w-5 h-5 text-green-600" />;
    case "output":
      return <Award className="w-5 h-5 text-purple-600" />;
    default:
      return <BookOpen className="w-5 h-5 text-blue-600" />;
  }
};

const getNodeStyle = (type: string) => {
  switch (type) {
    case "input":
      return "border-green-200 bg-green-50";
    case "output":
      return "border-purple-200 bg-purple-50";
    default:
      return "border-blue-200 bg-blue-50";
  }
};

export default function RoadmapNode({ data, type }: RoadmapNodeProps) {
  return (
    <div className="min-w-[280px] max-w-[320px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <Card
        className={`shadow-lg hover:shadow-xl transition-shadow ${getNodeStyle(
          type
        )}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getNodeIcon(type)}
              <Badge variant="secondary" className="text-xs">
                {type === "input"
                  ? "Start"
                  : type === "output"
                  ? "Goal"
                  : "Step"}
              </Badge>
            </div>
            {data.link && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <CardTitle className="text-lg leading-tight">{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </CardContent>
      </Card>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
