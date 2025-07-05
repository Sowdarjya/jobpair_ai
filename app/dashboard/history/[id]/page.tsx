"use client";

import CoverLetterDisplay from "@/components/CoverLetterDisplay";
import ResumeAnalysisDisplay from "@/components/ResumeAnalysisDisplay";
import RoadmapFlow from "@/components/RoadmapFlow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Loader2Icon, Map } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!id) return null;

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/history/${id}`);
      const data = await response.json();
      setData(data.history);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchHistory();
    } catch (error) {}
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin h-10 w-10" />
      </div>
    );
  //@ts-ignore
  if (data?.tool === "COVER_LETTER_GENERATOR") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <CoverLetterDisplay
              // @ts-ignore
              coverLetter={data?.output?.coverLetter}
              // @ts-ignore
              pdfUrl={data?.output?.pdfUrl}
              // @ts-ignore
              jobTitle={data?.input?.jobTitle}
              // @ts-ignore
              companyName={data?.input?.companyName}
            />
          </div>
        </div>
      </div>
    );
  }
  // @ts-ignore
  else if (data?.tool === "RESUME_ANALYZER") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6">
            <ResumeAnalysisDisplay
              //@ts-ignore
              data={data?.output}
            />
          </div>
        </div>
      </div>
    );
  }
  // @ts-ignore
  else if (data?.tool === "ROADMAP_GENERATOR") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6 max-w-6xl mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-3">
                      {
                        // @ts-ignore
                        data?.input!
                      }
                    </h2>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-4">
                      {
                        // @ts-ignore
                        data?.output?.description
                      }
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        Duration:
                        {
                          // @ts-ignore
                          data?.output.duration
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-6 h-6 text-indigo-600" />
                  Your Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RoadmapFlow
                  //@ts-ignore
                  nodes={data?.output?.initialNodes}
                  //@ts-ignore
                  edges={data?.output?.initialEdges}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
