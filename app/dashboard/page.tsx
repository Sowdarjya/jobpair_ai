"use client";

import ToolCard from "@/components/ToolCard";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

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
];

const Dashboard = () => {
  const { user } = useUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full">
      <div className="my-7 w-6xl mx-auto border bg-white p-5 rounded-xl">
        <div className=" text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-4 text-white">
          <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
          <p className="mt-5 text-xl font-medium">
            Select the AI tool you like to use
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {tools.map((tool, index) => (
            <div key={index}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
