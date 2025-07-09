"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Trophy,
  TrendingUp,
  MessageSquare,
  Code,
  Lightbulb,
  Users,
  Palette,
  Shuffle,
  Calendar,
  Briefcase,
  FileText,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Target,
} from "lucide-react";

interface FeedbackScores {
  Overall_Score: number;
  Communication: number;
  Technical_Knowledge: number;
  Problem_Solving: number;
  Leadership: number;
  Collaboration: number;
  Creativity: number;
  Adaptability: number;
}

interface InterviewDetails {
  id: string;
  createdAt: string;
  feedback: string;
  jobDescription: string;
  jobRole: string;
  level: string;
  questions: string[];
  type: string;
  userId: string;
}

const FeedbackPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [interviewDetails, setInterviewDetails] =
    useState<InterviewDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviewFeedback = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/get-interview?id=${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch interview details");
      }
      const data = await res.json();
      setInterviewDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInterviewFeedback();
    }
  }, [id]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Average";
    if (score >= 60) return "Below Average";
    return "Needs Improvement";
  };

  const getScoreBadgeVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 70) return "secondary";
    if (score >= 60) return "outline";
    return "destructive";
  };

  const skillIcons = {
    Communication: MessageSquare,
    Technical_Knowledge: Code,
    Problem_Solving: Lightbulb,
    Leadership: Trophy,
    Collaboration: Users,
    Creativity: Palette,
    Adaptability: Shuffle,
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!interviewDetails) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No feedback found for this interview.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const feedbackScores: FeedbackScores = JSON.parse(interviewDetails.feedback);
  const overallScore = feedbackScores.Overall_Score;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Interview Feedback</h1>
            <p className="text-muted-foreground">
              {new Date(interviewDetails.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Overall Performance</CardTitle>
              <CardDescription>
                Your comprehensive interview score
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div
                  className={`text-6xl font-bold ${getScoreColor(
                    overallScore
                  )}`}
                >
                  {overallScore}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <Badge
                  variant={getScoreBadgeVariant(overallScore)}
                  className="text-sm px-3 py-1"
                >
                  {getScoreLabel(overallScore)}
                </Badge>
              </div>
              <Progress value={overallScore} className="h-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Skills Assessment
              </CardTitle>
              <CardDescription>
                Detailed breakdown of your performance across different areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(feedbackScores)
                  .filter(([key]) => key !== "Overall_Score")
                  .map(([skill, score]) => {
                    const IconComponent =
                      skillIcons[skill as keyof typeof skillIcons];
                    const skillName = skill.replace(/_/g, " ");

                    return (
                      <div key={skill} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-muted">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{skillName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold ${getScoreColor(score)}`}
                            >
                              {score}
                            </span>
                            <Badge
                              variant={getScoreBadgeVariant(score)}
                              className="text-xs"
                            >
                              {getScoreLabel(score)}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Interview Questions
              </CardTitle>
              <CardDescription>
                Questions covered during your interview session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {interviewDetails.questions.map((question, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 rounded-lg border bg-muted/50"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{question}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Interview Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Position
                </p>
                <p className="font-medium">{interviewDetails.jobRole}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Experience Level
                </p>
                <Badge variant="secondary" className="capitalize">
                  {interviewDetails.level}
                </Badge>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Interview Type
                </p>
                <Badge variant="outline" className="capitalize">
                  {interviewDetails.type}
                </Badge>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Questions Asked
                </p>
                <p className="font-medium">
                  {interviewDetails.questions.length} questions
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3" />
                  {new Date(interviewDetails.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Strengths</span>
                  <span className="font-medium">
                    {
                      Object.entries(feedbackScores).filter(
                        ([key, score]) => key !== "Overall_Score" && score >= 85
                      ).length
                    }{" "}
                    areas
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Areas to improve
                  </span>
                  <span className="font-medium">
                    {
                      Object.entries(feedbackScores).filter(
                        ([key, score]) => key !== "Overall_Score" && score < 75
                      ).length
                    }{" "}
                    areas
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average score</span>
                  <span className="font-medium">
                    {Math.round(
                      Object.entries(feedbackScores)
                        .filter(([key]) => key !== "Overall_Score")
                        .reduce((sum, [, score]) => sum + score, 0) /
                        Object.keys(feedbackScores).filter(
                          (key) => key !== "Overall_Score"
                        ).length
                    )}
                    /100
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <Button
                className="w-full hover:cursor-pointer"
                onClick={() => router.push("/dashboard/mock-interview")}
              >
                Take Another Interview
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
