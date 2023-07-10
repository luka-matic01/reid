import { v4 as uuidv4 } from "uuid";

export const getCreatedQuestionsData = (questions) => {
  try {
    return questions.map((question) => ({
      id: uuidv4(), // Generate unique ID for each question object
      question: question?.question, // Get the question property from the input question object
      answer: question?.answer, // Get the answer property from the input question object
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};
