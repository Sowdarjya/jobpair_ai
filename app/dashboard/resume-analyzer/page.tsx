"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { File } from "lucide-react";
import ResumeAnalysisDisplay from "@/components/ResumeAnalysisDisplay";

export default function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitAndAnalyze = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("resume", selectedFile);
    }
    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setAnalysisData(data.analysis);
      setShowAnalysis(true);
    } catch (error) {
      alert("Failed to analyze resume. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 shadow-2xl flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-lg">
              Resume Analyzer
            </h1>
            <p className="mt-3 text-lg text-white/90 text-center max-w-2xl">
              Upload your PDF resume and get instant, AI-powered feedback and
              actionable insights to improve your career prospects.
            </p>
          </div>
        </div>

        {!showAnalysis ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form
                  onSubmit={handleSubmitAndAnalyze}
                  className="flex flex-col items-center gap-4"
                >
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer hover:bg-blue-50 transition w-full"
                  >
                    <File className="w-10 h-10 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-800">
                      Upload Resume
                    </h2>
                    {selectedFile ? (
                      <p className="text-sm text-blue-600">
                        {selectedFile.name}
                      </p>
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
                    className={`w-full py-3 text-lg font-semibold rounded-xl transition ${
                      selectedFile
                        ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white shadow-lg hover:scale-105 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!selectedFile || loading}
                    type="submit"
                  >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button
                onClick={() => setShowAnalysis(false)}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer"
              >
                ← Back to Upload
              </Button>
            </div>
            {analysisData && <ResumeAnalysisDisplay data={analysisData} />}
          </div>
        )}
      </div>
    </div>
  );
}
