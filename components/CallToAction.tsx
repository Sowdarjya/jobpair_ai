import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-base sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of job seekers who have improved their interview rates
          with AI-powered resume optimization
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
          asChild
        >
          <Link href="/dashboard">
            Start Free Analysis <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
