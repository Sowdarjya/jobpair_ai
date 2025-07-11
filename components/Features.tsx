import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart3, Brain, FileText, Target, Upload, Zap } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white w-full">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-powered tools for your complete career development
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Smart Resume Analysis</CardTitle>
              <CardDescription>
                Upload your resume and receive detailed analysis with actionable
                feedback on content, structure, and formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Personalized Career Roadmap</CardTitle>
              <CardDescription>
                Create a tailored roadmap for your career with AI-guided
                recommendations, key milestones, and goal planning
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>AI Mock Interview</CardTitle>
              <CardDescription>
                Practice your interview skills with AI-powered mock interviews
                and receive detailed feedback for improvement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Smart Cover Letter Generator</CardTitle>
              <CardDescription>
                Generate well-structured and effective cover letters tailored to
                your job applications and experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your career development journey and track your progress
                with comprehensive activity history
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get intelligent career insights and data-driven recommendations
                to make informed professional decisions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
