import axios from "axios";

export const fetchQuiz = async (id, quizType, reset, prepend) => {
  try {
    const response = await axios.get(`http://localhost:3000/quizzes/${id}`);
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
