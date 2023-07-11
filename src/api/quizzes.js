import axios from "axios";

// GET /quizzes
export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes`);
    const allQuizes = response.data;
    return allQuizes;
  } catch (error) {
    console.error(error);
  }
};

// GET /quizzes/${id}
export const fetchQuiz = async (id, quizType, reset, prepend) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/quizzes/${id}`
    );
    const quiz = response.data;
    if (quizType === "edit") {
      reset();
      // Render questions when you go to Edit page
      prepend(quiz.questions);
    }
    return quiz;
  } catch (error) {
    console.error(error);
  }
};

// DELETE /quizzes/${id}
export const deleteQuiz = async (quizId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this quiz?"
  );
  if (!confirmDelete) {
    return;
  }

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/quizzes/${quizId}`
    );
    if (!response.status === 200) {
      throw new Error("Failed to delete quiz");
    }
    fetchQuizzes();
  } catch (error) {
    console.error(error);
  }
};
