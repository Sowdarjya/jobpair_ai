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
            Everything you need to optimize your resume and land more interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Smart Resume Parsing</CardTitle>
              <CardDescription>
                Upload PDF/DOCX files and let AI extract skills, experience, and
                education automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Job Matching Score</CardTitle>
              <CardDescription>
                Get precise compatibility scores (0-100%) between your resume
                and job descriptions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>AI Skill Gap Analysis</CardTitle>
              <CardDescription>
                Discover missing skills and get personalized learning
                recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Resume Enhancement</CardTitle>
              <CardDescription>
                AI suggests improved bullet points and stronger action words for
                impact
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Cover Letter Generator</CardTitle>
              <CardDescription>
                Generate personalized cover letters tailored to specific job
                descriptions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track application progress and analyze job market trends for
                your skills
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
