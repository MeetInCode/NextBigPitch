"use client";
import React, { useState } from "react";
import { ProfileForm } from "@/components/aiform";

export default function StartupGPTPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerateRecipe = async () => {
    const result = await generate(prompt);
    setResponse(result);
  };

  return (
    <>
      <ProfileForm />
    </>
  );
}
