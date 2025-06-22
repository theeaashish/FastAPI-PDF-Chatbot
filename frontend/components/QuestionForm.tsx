import SendButtonIcon from "@/svg/SendButtonIcon";
import React from "react";

interface QuestionFormProps {
  file: File | null;
  question: string;
  isLoading: boolean;
//   onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  file,
  question,
  isLoading,
//   onFileChange,
  onQuestionChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="m-auto fixed w-full max-sm:px-4 sm:px-24 h-[120px] flex items-center justify-center bottom-0 bg-white">
      <div className="flex w-full items-center rounded-xl border-2 border-gray-400/30 pr-6">
        <input
          type="text"
          className="w-full text-sm font-medium py-4 px-8 placeholder:font-medium placeholder:text-sm outline-none"
          value={question}
          onChange={onQuestionChange}
          placeholder="Send a message..."
        />
        <button
          type="submit"
          className="cursor-pointer p-3"
          disabled={!file || !question || isLoading}
        >
          {" "}
          <SendButtonIcon />{" "}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
