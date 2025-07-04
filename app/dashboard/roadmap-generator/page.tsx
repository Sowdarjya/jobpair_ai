"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Map, Clock, BookOpen, Target, Lightbulb } from "lucide-react";
import RoadmapFlow from "@/components/RoadmapFlow";

interface RoadmapData {
  roadmapTitle: string;
  description: string;
  duration: string;
  initialNodes: any[];
  initialEdges: any[];
}

export default function RoadmapGenerator() {
  const [userInput, setUserInput] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await res.json();
      setRoadmap(data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setRoadmap(null);
    setUserInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learning Roadmap Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create personalized learning roadmaps for any skill or career path.
            Get a structured, visual guide to achieve your goals.
          </p>
        </div>

        {!roadmap ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                  What would you like to learn?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="e.g., I want to become a full-stack developer, learn data science, master digital marketing, etc."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="min-h-[120px] resize-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!userInput.trim() || loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Roadmap...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Generate My Roadmap
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="text-center p-4 border-indigo-100 bg-indigo-50/50">
                <Target className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold text-indigo-900">Personalized</h3>
                <p className="text-sm text-indigo-700">
                  Tailored to your goals and experience level
                </p>
              </Card>
              <Card className="text-center p-4 border-purple-100 bg-purple-50/50">
                <Map className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Visual</h3>
                <p className="text-sm text-purple-700">
                  Interactive flowchart format
                </p>
              </Card>
              <Card className="text-center p-4 border-green-100 bg-green-50/50">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Actionable</h3>
                <p className="text-sm text-green-700">
                  Step-by-step learning path
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-6xl mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3">
                      {roadmap.roadmapTitle}
                    </h2>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-4">
                      {roadmap.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        Duration: {roadmap.duration}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent cursor-pointer "
                  >
                    Create New Roadmap
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-6 h-6 text-indigo-600" />
                  Your Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RoadmapFlow
                  nodes={roadmap.initialNodes}
                  edges={roadmap.initialEdges}
                />
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  How to use this roadmap:
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Start with the green "Start" node and follow the flow
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Click the external link icon on each node for additional
                    resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Purple "Goal" nodes represent your final objectives
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Use the controls to zoom and navigate the roadmap
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
