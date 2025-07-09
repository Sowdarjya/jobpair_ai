"use client";

import ToolCard from "@/components/ToolCard";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Clock, FileText, Map, Mail, Mic } from "lucide-react";

const tools = [
  {
    name: "Resume Analyzer",
    desc: "Analyze your resume and get insights",
    icon: "/Analyze.png",
    path: "/dashboard/resume-analyzer",
  },
  {
    name: "Roadmap Generator",
    desc: "Generate a roadmap for a particular career",
    icon: "/mind_map.png",
    path: "/dashboard/roadmap-generator",
  },
  {
    name: "Cover Letter Generator",
    desc: "Generate a cover letter for a particular job",
    icon: "/letter.png",
    path: "/dashboard/cover-letter-generator",
  },
  {
    name: "Mock Interview",
    desc: "Practice with AI-powered mock interviews",
    icon: "/interview.png",
    path: "/dashboard/mock-interview",
  },
];

interface HistoryItem {
  id: string;
  tool:
    | "RESUME_ANALYZER"
    | "ROADMAP_GENERATOR"
    | "COVER_LETTER_GENERATOR"
    | "MOCK_INTERVIEW";
  input: any;
  output: any;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [recentHistory, setRecentHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    fetchRecentHistory();
  }, []);

  const fetchRecentHistory = async () => {
    try {
      const response = await fetch("/api/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecentHistory(data.history || []);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (historyId: string, tool: string, input: any) => {
    if (tool === "MOCK_INTERVIEW") {
      const mockInterviewId =
        Array.isArray(input) && input.length > 0 ? input[0].id : null;
      if (mockInterviewId) {
        router.push(`/dashboard/mock-interview/${mockInterviewId}/feedback`);
      }
    } else {
      router.push(`/dashboard/history/${historyId}`);
    }
  };

  const getToolIcon = (tool: string) => {
    switch (tool) {
      case "RESUME_ANALYZER":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "ROADMAP_GENERATOR":
        return <Map className="w-5 h-5 text-purple-600" />;
      case "COVER_LETTER_GENERATOR":
        return <Mail className="w-5 h-5 text-green-600" />;
      case "MOCK_INTERVIEW":
        return <Mic className="w-5 h-5 text-orange-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getToolName = (tool: string) => {
    switch (tool) {
      case "RESUME_ANALYZER":
        return "Resume Analyzer";
      case "ROADMAP_GENERATOR":
        return "Roadmap Generator";
      case "COVER_LETTER_GENERATOR":
        return "Cover Letter Generator";
      case "MOCK_INTERVIEW":
        return "Mock Interview";
      default:
        return tool;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPreviewText = (item: HistoryItem) => {
    switch (item.tool) {
      case "RESUME_ANALYZER":
        return item.input?.filename || "Resume analysis";
      case "ROADMAP_GENERATOR":
        return typeof item.input === "string"
          ? item.input.slice(0, 50) + "..."
          : "Roadmap generated";
      case "COVER_LETTER_GENERATOR":
        return `${item.input?.jobTitle || "Job"} at ${
          item.input?.companyName || "Company"
        }`;
      case "MOCK_INTERVIEW":
        const meta = Array.isArray(item.input) ? item.input[0] : {};
        const score = item.output?.Overall_Score || "N/A";
        return `${meta?.jobRole || "Mock Interview"} - Score: ${score}`;
      default:
        return "Activity";
    }
  };

  const getStatusBadge = (item: HistoryItem) => {
    if (item.tool === "MOCK_INTERVIEW") {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Completed
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen w-full">
      <div className="my-7 w-6xl mx-auto border bg-white p-5 rounded-xl">
        <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-4 text-white">
          <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
          <p className="mt-5 text-xl font-medium">
            Select the AI tool you like to use
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {tools.map((tool, index) => (
            <div key={index}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>

        <div className="mt-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
          </div>

          {loading ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : recentHistory.length > 0 ? (
            <div className="space-y-3">
              {recentHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    handleHistoryClick(item.id, item.tool, item.input)
                  }
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getToolIcon(item.tool)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-800">
                            {getToolName(item.tool)}
                          </h3>
                          {getStatusBadge(item)}
                        </div>
                        <p className="text-sm text-gray-600">
                          {getPreviewText(item)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent activity yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Start using the tools below to see your activity here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
