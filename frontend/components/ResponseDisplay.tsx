import React from 'react'
import ChatMessage from './ChatMessage';

interface props {
  question: string;
  answer?: string;
  error?: string | null;
}

const ResponseDisplay: React.FC<props> = ({ question, answer, error }) => {
  if (!question && !answer && !error) return null;

  return (
    <div className='overflow-auto'>
      {question && <ChatMessage message={question} sender="user"/>}
      {answer && <ChatMessage message={answer} sender='ai'/>}
      {error && <ChatMessage message={`Error: ${error}`} sender='ai'/>}
    </div>
  )
}

export default ResponseDisplay