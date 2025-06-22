import Image from "next/image";
import React from "react";

interface ChatMessageProps {
  sender: "user" | "ai";
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message }) => {
  const isUser = sender === "user";
  const iconSrc = isUser ? "/user.svg" : "/ai-planet.svg";
  return (
    <div className={`flex justify-start items-start max-sm:w-full mb-4`}>
      {!isUser && (
        <Image
          src={iconSrc}
          alt={sender}
          width={36}
          height={36}
          className="mr-3 mt-2"
        />
      )}
      {isUser && (
        <Image
          src={iconSrc}
          alt="icon"
          width={36}
          height={36}
          className="mr-3"
        />
      )}

      <div
        className={`md:max-w-[70%]  md:px-4 py-2 rounded-lg text-sm whitespace-pre-wrap`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
