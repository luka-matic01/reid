import axios from "axios";

// Fetches all the questions from the database
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/questions`
    );
    const questions = response.data;
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// Fetches selected questions (RECYCLING) from the server based on the given question IDs.
export const fetchSelectedQuestions = async (selectedQuestionsIds) => {
  // Iterate through each question ID
  const getQuestionsQueryParams = selectedQuestionsIds
    .map((id) => `id=${id}`)
    .join("&");

  if (getQuestionsQueryParams) {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/questions?${getQuestionsQueryParams}`
    );
    const selectedQuestions = response.data;
    return selectedQuestions;
  }

  return [];
};

// Create the new questions that aren't from database
export const createQuestions = async (questionsData) => {
  try {
    const createdQuestions = [];
    for (const questionData of questionsData) {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/questions`,
        questionData
      );
      const createdQuestion = response.data;
      createdQuestions.push(createdQuestion);
    }

    return createdQuestions;
  } catch (error) {
    // Handle error
    console.error("Error creating questions:", error);
    throw new Error("Failed to create questions.");
  }
};

export const editQuestions = async (quiz) => {
  const questions = quiz.questions;
  try {
    const updatePromises = questions.map((question) =>
      axios.put(
        `${import.meta.env.VITE_BASE_URL}/questions/${question.id}`,
        question
      )
    );

    const updateResponses = await Promise.all(updatePromises);

    for (const response of updateResponses) {
      if (response.status !== 200) {
        throw new Error("Failed to update question");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
