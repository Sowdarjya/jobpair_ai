"use client";

import React, { useState } from "react";

const RoadmapGenerator = () => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput) return;

    const res = await fetch("/api/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="min-h-screen">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RoadmapGenerator;
