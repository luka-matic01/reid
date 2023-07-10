import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuizTable from "../components/QuizTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/quizzes`
      );
      const data = response.data;
      setQuizzes(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const deleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/quizzes/${quizId}`
      );
      if (!response.status === 200) {
        throw new Error("Failed to delete quiz");
      }
      fetchQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToSlideshow = (quizId) => {
    navigate(`/slideshow/${quizId}`);
  };

  const navigateToEdit = (quizId) => {
    navigate(`/edit/${quizId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-infinity loading-xs" />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen md:h-full">
      {quizzes.length > 0 ? (
        <QuizTable
          quizzes={quizzes}
          navigateToEdit={navigateToEdit}
          deleteQuiz={deleteQuiz}
          navigateToSlideshow={navigateToSlideshow}
        />
      ) : (
        <h1 className="text-[18px] text-center">
          <img src="no-quizzes.png" alt="There are no quizzes" />
          There are currently no quizzes. Create one!
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
