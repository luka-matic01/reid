import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuizTable from "../components/QuizTable";
import { deleteQuiz, fetchQuizzes } from "../api/quizzes";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllQuizes = async () => {
    const allQuizzes = await fetchQuizzes();
    setQuizzes(allQuizzes);
    setIsLoading(false);
  };

  const deletingQuiz = async (quizId) => {
    await deleteQuiz(quizId);
    fetchAllQuizes();
  };

  useEffect(() => {
    fetchAllQuizes();
  }, []);

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
      {quizzes?.length > 0 ? (
        <QuizTable
          quizzes={quizzes}
          navigateToEdit={navigateToEdit}
          deleteQuiz={deletingQuiz}
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
