"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  FileText,
  Upload,
  Briefcase,
  Building,
  User,
  Palette,
  Ruler,
} from "lucide-react";
import CoverLetterDisplay from "@/components/CoverLetterDisplay";

interface CoverLetterResponse {
  coverLetter: {
    intro: string;
    body: string;
    closing: string;
    tone: string;
    length: string;
  };
  pdfUrl: string;
}

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    resume: null as File | null,
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    tone: "",
    length: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        handleFileChange(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.resume ||
      !formData.jobTitle ||
      !formData.companyName ||
      !formData.tone ||
      !formData.length
    ) {
      return;
    }

    setLoading(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("resume", formData.resume);
      submitFormData.append("jobTitle", formData.jobTitle);
      submitFormData.append("companyName", formData.companyName);
      submitFormData.append("jobDescription", formData.jobDescription);
      submitFormData.append("tone", formData.tone);
      submitFormData.append("length", formData.length);

      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        body: submitFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFormData({
      resume: null,
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      tone: "",
      length: "",
    });
    setResult(null);
  };

  const isFormValid =
    formData.resume &&
    formData.jobTitle &&
    formData.companyName &&
    formData.tone &&
    formData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Cover Letter Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create personalized, professional cover letters tailored to any job
            application. Upload your resume and let AI craft the perfect cover
            letter.
          </p>
        </div>

        {!result ? (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Generate Your Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Resume (PDF) *
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive
                          ? "border-blue-500 bg-blue-50"
                          : formData.resume
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleFileChange(e.target.files?.[0] || null)
                        }
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        {formData.resume ? (
                          <p className="text-green-600 font-medium">
                            {formData.resume.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-gray-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-400">
                              PDF files only
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="jobTitle"
                        className="text-base font-semibold flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4" />
                        Job Title *
                      </Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Software Engineer"
                        value={formData.jobTitle}
                        onChange={(e) =>
                          handleInputChange("jobTitle", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="companyName"
                        className="text-base font-semibold flex items-center gap-2"
                      >
                        <Building className="w-4 h-4" />
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="e.g., Acme Corp"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="jobDescription"
                      className="text-base font-semibold flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Job Description (Optional)
                    </Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description here to get a more tailored cover letter..."
                      value={formData.jobDescription}
                      onChange={(e) =>
                        handleInputChange("jobDescription", e.target.value)
                      }
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Tone *
                      </Label>
                      <Select
                        value={formData.tone}
                        onValueChange={(value) =>
                          handleInputChange("tone", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="enthusiastic">
                            Enthusiastic
                          </SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="conversational">
                            Conversational
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        Length *
                      </Label>
                      <Select
                        value={formData.length}
                        onValueChange={(value) =>
                          handleInputChange("length", value)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">
                            Short (~100 words)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium (~150 words)
                          </SelectItem>
                          <SelectItem value="long">
                            Long (~200 words)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Cover Letter...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Generate Cover Letter
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="text-center p-4 border-blue-100 bg-blue-50/50">
                <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Personalized</h3>
                <p className="text-sm text-blue-700">
                  Tailored to your resume and target job
                </p>
              </Card>
              <Card className="text-center p-4 border-green-100 bg-green-50/50">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Professional</h3>
                <p className="text-sm text-green-700">
                  Industry-standard format and language
                </p>
              </Card>
              <Card className="text-center p-4 border-purple-100 bg-purple-50/50">
                <Loader2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Fast</h3>
                <p className="text-sm text-purple-700">
                  Generated in seconds, not hours
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent cursor-pointer"
              >
                ← Generate Another
              </Button>
            </div>
            <CoverLetterDisplay
              coverLetter={result.coverLetter}
              pdfUrl={result.pdfUrl}
              jobTitle={formData.jobTitle}
              companyName={formData.companyName}
            />
          </div>
        )}
      </div>
    </div>
  );
}
