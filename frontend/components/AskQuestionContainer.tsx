"use client";

import React, { useRef, useState } from "react";
import Header from "./Header";
import { askQuestion } from "@/lib/api";
import QuestionForm from "./QuestionForm";
import ChatMessage from "./ChatMessage";

const AskQuestionContainer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState<
    { sender: "user" | "ai"; message: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // trigger file input click from header
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !question.trim()) return;

    const userMessage = question;
    setChatResponse((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
    ]);
    setQuestion("");
    setLoading(true);
    setError(null);

    try {
      const result = await askQuestion(file, userMessage);
      if (result?.answer) {
        setChatResponse((prev) => [
          ...prev,
          { sender: "ai", message: result.answer },
        ]);
      } else {
        setChatResponse((prev) => [
          ...prev,
          { sender: "ai", message: "sorry, i can't find the answer" },
        ]);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to get the answer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen  relative">
      <Header onUploadClick={handleUploadClick} fileName={file?.name} />

      {/* hidden file input */}
      <input
        type="file"
        ref={inputRef}
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="text-red-600 text-sm text-center my-4">{error}</div>
      )}

      <div className="md:px-40 px-8 mt-30 pb-30 overflow-auto">
        {chatResponse.map((item, index) => (
          <ChatMessage
            key={index}
            sender={item.sender}
            message={item.message}
          />
        ))}

        {loading && <ChatMessage sender="ai" message="Thinking..." />}
      </div>

      <QuestionForm
        file={file}
        question={question}
        isLoading={loading}
        onQuestionChange={handleQuestionChange}
        // onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AskQuestionContainer;
