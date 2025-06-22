'use client';

import { useState } from 'react';
import { askQuestion } from '@/lib/api';

export default function AskQuestionTest() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !question) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await askQuestion(file, question);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ask Question Test</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select PDF file:</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block mb-2">Your question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ask something about the PDF..."
          />
        </div>

        <button
          type="submit"
          disabled={!file || !question || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Ask Question'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {response && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Response:</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>

          {response.preview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Text Preview:</h3>
              <p className="mt-2 p-4 bg-gray-50 rounded whitespace-pre-wrap">
                {response.preview}
              </p>
            </div>
          )}

          {response.answer && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Answer:</h3>
              <p className="mt-2 p-4 bg-green-50 rounded whitespace-pre-wrap">
                {response.answer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}