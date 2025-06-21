"use client";
import FileUpload from "@/components/FileUpload";
import Header from "@/components/Header";
import React, { useRef } from "react";

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <Header onUploadClick={handleUploadClick} />

      <FileUpload inputRef={inputRef}/>
    </div>
  );
};

export default Home;
