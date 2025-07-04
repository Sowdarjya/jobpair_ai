"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Eye, Copy, Check } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

interface CoverLetterData {
  intro: string;
  body: string;
  closing: string;
  tone: string;
  length: string;
}

interface CoverLetterDisplayProps {
  coverLetter: CoverLetterData;
  pdfUrl?: string;
  jobTitle?: string;
  companyName?: string;
}

export default function CoverLetterDisplay({
  coverLetter,
  pdfUrl,
  jobTitle,
  companyName,
}: CoverLetterDisplayProps) {
  const [copied, setCopied] = useState(false);

  const fullCoverLetter = `${coverLetter.intro}\n\n${coverLetter.body}\n\n${coverLetter.closing}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCoverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Cover Letter", margin, 30);

    if (jobTitle && companyName) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Position: ${jobTitle} at ${companyName}`, margin, 45);
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    let yPosition = 65;

    const splitText = (text: string, maxWidth: number) => {
      return doc.splitTextToSize(text, maxWidth);
    };

    const introLines = splitText(coverLetter.intro, maxWidth);
    doc.text(introLines, margin, yPosition);
    yPosition += introLines.length * 6 + 10;

    const bodyLines = splitText(coverLetter.body, maxWidth);
    doc.text(bodyLines, margin, yPosition);
    yPosition += bodyLines.length * 6 + 10;

    const closingLines = splitText(coverLetter.closing, maxWidth);
    doc.text(closingLines, margin, yPosition);
    yPosition += closingLines.length * 6 + 20;

    doc.text("Sincerely,", margin, yPosition);
    doc.text("_____________________", margin, yPosition + 20);
    doc.text("Your Name", margin, yPosition + 30);

    const fileName = `Cover_Letter_${jobTitle || "Position"}_${
      companyName || "Company"
    }.pdf`.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(fileName);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Cover Letter Generated!
              </h2>
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  Tone: {coverLetter.tone}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  Length: {coverLetter.length}
                </Badge>
              </div>
            </div>
            <FileText className="w-12 h-12 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Your Cover Letter
            </span>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent cursor-pointer hover:bg-gray-200 text-gray-800 hover:text-gray-900"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 cursor-pointer "
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 font-serif leading-relaxed">
            <div className="mb-6">
              <p className="text-gray-800 text-base leading-7">
                {coverLetter.intro}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-800 text-base leading-7">
                {coverLetter.body}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-gray-800 text-base leading-7">
                {coverLetter.closing}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-800">Sincerely,</p>
              <div className="border-b border-gray-400 w-48 mb-2"></div>
              <p className="text-gray-600 text-sm">Your Name</p>
            </div>
          </div>

          {pdfUrl && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Your uploaded resume
                </span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-amber-800 mb-3">💡 Next Steps:</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>
              • Review and customize the cover letter to match your personal
              style
            </li>
            <li>
              • Add specific examples from your experience that relate to the
              job
            </li>
            <li>• Include the hiring manager's name if available</li>
            <li>• Proofread for any errors before submitting</li>
            <li>• Save a copy for your records</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
