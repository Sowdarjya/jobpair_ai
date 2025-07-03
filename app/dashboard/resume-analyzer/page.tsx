"use client";

import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import React, { useState } from "react";

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitAndAnalyze = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("resume", selectedFile!);
    const response = await fetch("/api/analyze-resume", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto mb-8 px-6">
        <div className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white">
            Upload Resume PDF and Get Insights
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <File className="w-8 h-8 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Upload Resume
            </h2>
            {selectedFile ? (
              <p className="text-sm text-gray-500">{selectedFile.name}</p>
            ) : (
              <p className="text-sm text-gray-500">
                Only PDF files are supported
              </p>
            )}
          </label>
          <input
            type="file"
            accept="application/pdf"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            className={`mt-4 w-full ${
              selectedFile
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedFile || loading}
            onClick={handleSubmitAndAnalyze}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
