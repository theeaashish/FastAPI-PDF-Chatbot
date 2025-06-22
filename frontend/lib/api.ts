const API_BASE_URL = "http://localhost:8000";

interface AskQuestionResponse {
  answer: string;
}

export const askQuestion = async (
  file: File,
  question: string
): Promise<AskQuestionResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("question", question);

  try {
    const response = await fetch(`${API_BASE_URL}/ask-question/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.error ||
        "an unknown error occurred while processing your question";
      throw new Error(errorMessage);
    }

    const data: AskQuestionResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("askqueston error: ", error.message);
    }
    console.log("unexpected error: ", error);
    throw new Error("Something went wrong. Please try again.");
  }
};
