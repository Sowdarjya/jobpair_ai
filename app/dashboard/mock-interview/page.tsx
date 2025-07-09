"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle,
  Video,
  Briefcase,
  User,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

interface InterviewData {
  id: string;
  jobRole: string;
  jobDescription: string;
  level: string;
  type: string;
  questions: string[];
  createdAt: string;
}

const MockInterview = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
    level: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdInterview, setCreatedInterview] =
    useState<InterviewData | null>(null);
  const { user } = useUser();

  if (!user) {
    router.back();
  }

  const levels = [
    {
      value: "junior",
      label: "Junior Level",
      description: "0-2 years experience",
    },
    { value: "mid", label: "Mid Level", description: "2-5 years experience" },
    {
      value: "senior",
      label: "Senior Level",
      description: "5+ years experience",
    },
    { value: "lead", label: "Lead/Principal", description: "Leadership role" },
  ];

  const types = [
    {
      value: "technical",
      label: "Technical",
      description: "Focus on technical skills and knowledge",
    },
    {
      value: "behavioral",
      label: "Behavioral",
      description: "Focus on soft skills and experience",
    },
    {
      value: "mixed",
      label: "Mixed",
      description: "Combination of technical and behavioral",
    },
    {
      value: "case-study",
      label: "Case Study",
      description: "Problem-solving scenarios",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.jobRole.trim()) {
      setError("Job role is required");
      return false;
    }
    if (!formData.jobDescription.trim()) {
      setError("Job description is required");
      return false;
    }
    if (!formData.level) {
      setError("Please select an experience level");
      return false;
    }
    if (!formData.type) {
      setError("Please select an interview type");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok && response.status === 403) {
        router.push("/pricing");
      }

      if (!response.ok) {
        throw new Error("Failed to create interview");
      }

      const interview = await response.json();
      setCreatedInterview(interview);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (createdInterview) {
      router.push(`/dashboard/mock-interview/${createdInterview.id}`);
    }
  };

  if (createdInterview) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Interview Created Successfully!
            </CardTitle>
            <CardDescription className="text-green-600">
              Your mock interview has been generated and is ready to start
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{createdInterview.jobRole}</p>
                  <p className="text-sm text-muted-foreground">Job Role</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <User className="h-5 w-5 text-purple-600" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{createdInterview.level}</Badge>
                  <Badge variant="outline">{createdInterview.type}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">
                    {createdInterview.questions.length} Questions Generated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ready for your interview
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStartInterview}
                className="flex-1 hover:cursor-pointer"
                size="lg"
              >
                <Video className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Mock Interview</h1>
        <p className="text-muted-foreground">
          Generate personalized interview questions based on your job
          requirements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Interview Details
          </CardTitle>
          <CardDescription>
            Provide the job details to generate relevant interview questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role *</Label>
              <Input
                id="jobRole"
                placeholder="e.g., Frontend Developer, Product Manager, Data Scientist"
                value={formData.jobRole}
                onChange={(e) => handleInputChange("jobRole", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                placeholder="Describe the role, responsibilities, required skills, and qualifications..."
                value={formData.jobDescription}
                onChange={(e) =>
                  handleInputChange("jobDescription", e.target.value)
                }
                disabled={loading}
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Experience Level *</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange("level", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex flex-col">
                          <span>{level.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {level.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Interview Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span>{type.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {type.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hover:cursor-pointer "
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Interview...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Interview
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Your interview will be generated with personalized questions based on
          the provided details
        </p>
      </div>
    </div>
  );
};

export default MockInterview;
