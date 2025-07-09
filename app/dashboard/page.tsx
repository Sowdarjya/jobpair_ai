"use client";

import ToolCard from "@/components/ToolCard";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Clock,
  FileText,
  Map,
  Mail,
  Mic,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
      case "ROADMAP_GENERATOR":
        return <Map className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case "COVER_LETTER_GENERATOR":
        return <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
      case "MOCK_INTERVIEW":
        return <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />;
      default:
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />;
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
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <Card className="mb-6 sm:mb-8 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className=" text-white">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                  Welcome back, {user?.firstName || "User"}!
                </h1>
                <p className="text-base sm:text-lg lg:text-xl font-medium opacity-90">
                  Select an AI tool to get started with your career journey
                </p>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Tools Grid */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            AI Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="h-full">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Clock className="w-5 h-5 text-gray-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 sm:p-4"
                  >
                    <Skeleton className="h-8 w-8 rounded" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            ) : recentHistory.length > 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {recentHistory.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      handleHistoryClick(item.id, item.tool, item.input)
                    }
                    className="group p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex-shrink-0 mt-0.5">
                          {getToolIcon(item.tool)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                              {getToolName(item.tool)}
                            </h3>
                            {getStatusBadge(item)}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 break-words">
                            {getPreviewText(item)}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {recentHistory.length > 5 && (
                  <div className="pt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/dashboard/history")}
                      className="w-full sm:w-auto"
                    >
                      View All Activity
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
                  No recent activity
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 max-w-md mx-auto">
                  Start using our AI tools to analyze resumes, generate
                  roadmaps, create cover letters, or practice interviews
                </p>
                <Button
                  onClick={() => router.push("/dashboard/resume-analyzer")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
