"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { SignInButton, useUser } from "@clerk/nextjs";

const Hero = () => {
  const { user } = useUser();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
          🚀 AI-Powered Career Optimization
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Land Your Dream Job with AI Resume Analysis
        </h1>
        <p className="text-base sm:text-xl text-gray-600 mb-8 leading-relaxed">
          Upload your resume, match it with job descriptions, and get AI-powered
          insights to boost your chances by up to 300%
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {user ? (
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/dashboard">
                Start Analyzing <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer"
              asChild
            >
              <SignInButton mode="modal">Get started</SignInButton>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Match Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600">Resumes Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
            <div className="text-gray-600">Higher Interview Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
