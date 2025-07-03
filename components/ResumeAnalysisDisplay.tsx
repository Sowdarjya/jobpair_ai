"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  User,
  GraduationCap,
  Briefcase,
  Code,
} from "lucide-react";

interface SectionData {
  score: number;
  comment: string;
  needs_improvement: string[];
  tips_for_improvement: string[];
  whats_good: string[];
}

interface AnalysisData {
  overall_score: number;
  overall_feedback: string;
  needs_improvement: string[];
  sections: {
    contact_info: SectionData;
    education: SectionData;
    experience: SectionData;
    skills: SectionData;
  };
  summary_comment: string;
  tips_for_improvement: string[];
  whats_good: string[];
}

interface ResumeAnalysisDisplayProps {
  data: AnalysisData;
}

const getSectionIcon = (sectionName: string) => {
  switch (sectionName) {
    case "contact_info":
      return <User className="w-5 h-5" />;
    case "education":
      return <GraduationCap className="w-5 h-5" />;
    case "experience":
      return <Briefcase className="w-5 h-5" />;
    case "skills":
      return <Code className="w-5 h-5" />;
    default:
      return <TrendingUp className="w-5 h-5" />;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50";
  if (score >= 80) return "text-blue-600 bg-blue-50";
  if (score >= 70) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

const getProgressColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

export default function ResumeAnalysisDisplay({
  data,
}: ResumeAnalysisDisplayProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Overall Resume Score</h2>
            </div>
            <div className="text-6xl font-extrabold drop-shadow-lg">
              {data.overall_score}
              <span className="text-3xl">%</span>
            </div>
            <div className="max-w-md mx-auto">
              <Progress
                value={data.overall_score}
                className="h-3 bg-white/20"
              />
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {data.overall_feedback}
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {data.summary_comment}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(data.sections).map(([sectionName, sectionData]) => (
          <Card key={sectionName} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg capitalize">
                {getSectionIcon(sectionName)}
                {sectionName.replace("_", " ")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className={`text-center p-4 rounded-lg ${getScoreColor(
                  sectionData.score
                )}`}
              >
                <div className="text-3xl font-bold">
                  {sectionData.score}
                  <span className="text-lg">%</span>
                </div>
              </div>
              <Progress value={sectionData.score} className="h-2" />
              <p className="text-sm text-gray-600 text-center">
                {sectionData.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              What's Good
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.whats_good.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.needs_improvement.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Lightbulb className="w-5 h-5" />
              Tips for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.tips_for_improvement.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detailed Section Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-4">
            {Object.entries(data.sections).map(([sectionName, sectionData]) => (
              <AccordionItem
                key={sectionName}
                value={sectionName}
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-4 hover:no-underline cursor-pointer ">
                  <div className="flex items-center gap-3 w-full">
                    {getSectionIcon(sectionName)}
                    <span className="capitalize font-semibold">
                      {sectionName.replace("_", " ")}
                    </span>
                    <Badge
                      variant="secondary"
                      className={getScoreColor(sectionData.score)}
                    >
                      {sectionData.score}%
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {sectionData.comment}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {sectionData.whats_good.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm text-green-800 bg-green-50 p-2 rounded"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-orange-700 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Areas to Improve
                        </h4>
                        <ul className="space-y-1">
                          {sectionData.needs_improvement.map((item, index) => (
                            <li
                              key={index}
                              className="text-sm text-orange-800 bg-orange-50 p-2 rounded"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-700 flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" />
                          Improvement Tips
                        </h4>
                        <ul className="space-y-1">
                          {sectionData.tips_for_improvement.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="text-sm text-blue-800 bg-blue-50 p-2 rounded"
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
