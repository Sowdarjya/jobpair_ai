"use client";

import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);

  const getInterviewDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/generate-questions?id=${id}`);

      if (res.ok) {
        const data = await res.json();
        setInterviewDetails(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, [id]);

  if (loading)
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10" />
        </div>
      </div>
    );

  return <div>page</div>;
};

export default page;
