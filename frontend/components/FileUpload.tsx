"use client";
import React, { useState } from "react";
import api from "@/lib/api";
import { UploadResponse } from "@/lib/types";

interface FileUploadProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const FileUpload: React.FC<FileUploadProps> = ({ inputRef }) => {
  //to show ssucces or error message
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // function triggered when a file is selected
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // prepare file to send in form data
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      // post request to fastapi backend
      const res = await api.post<UploadResponse>("/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // show response message from backend
      setMessage(`${res.data.message}`);
    } catch (error) {
      console.error("upload failed: ", error);
      setMessage("Upload Failed. Please try again.");
    } finally {
      setLoading(false);
    }

    console.log("selected files: ", file.name);
  };

  

  return (
    <>
      {/* hidden input field, triggered from header */}
      <input
        type="file"
        onChange={handleChange}
        ref={inputRef}
        accept="application/pdf"
        className="hidden"
      />

      {/* show msg below if exists */}
      {message && (
        <p className="text-sm text-center mt-2">
          {loading ? "Uploading..." : message}
        </p>
      )}
    </>
  );
};

export default FileUpload;
