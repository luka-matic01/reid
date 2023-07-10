import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";

import { fetchQuiz } from "../api/quizzes";

const SlideshowQuiz = () => {
  const questionRef = useRef(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  // GET /quizzes/{id}
  const fetchSpecificQuiz = useCallback(async () => {
    const quiz = await fetchQuiz(id, "slideshow", "", "");
    setQuiz(quiz);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchSpecificQuiz();
  }, [fetchSpecificQuiz]);

  // Slideshow Animation using GSAP
  useEffect(() => {
    if (questionRef.current) {
      const questionContainer = questionRef.current;
      gsap.fromTo(
        questionContainer,
        { opacity: 0, scale: 0.5, rotation: -20 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power1.out(1, 0.5)",
        }
      );
    }
  }, [questionRef, currentQuestionIndex]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-infinity loading-xs"></span>
        Loading...
      </div>
    );
  }

  // If there are no questions or quiz at all
  if (quiz.questions.length === 0) {
    return <div className="text-center">Add some questions to this quiz</div>;
  }

  // Show answer functionality
  const handleAnswerButtonClick = (questionIndex) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[questionIndex].showAnswer = true;

      // Check if it's the last question and set the isLastQuestion property accordingly
      if (questionIndex === quiz.questions.length - 1) {
        // Check if it's the last question
        updatedQuestions[questionIndex].isLastQuestion = true;
      }

      // Return the updated quiz object
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  // When we go to the next question, we are hiding the answer from the previous question
  const handleNextButtonClick = () => {
    if (currentQuestionIndex < quiz.questions?.length - 1) {
      setQuiz((prevQuiz) => {
        const updatedQuestions = [...prevQuiz.questions];
        updatedQuestions[currentQuestionIndex].showAnswer = false;
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        updatedQuestions[nextIndex].showAnswer = false;
        return { ...prevQuiz, questions: updatedQuestions };
      });
    }
  };

  // Show the previous button after 0 index
  const handlePreviousButtonClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Toggle slideshow the way you want
  const cardClassName = `bg-${theme === "dark" ? "black" : "white"} text-${
    theme === "dark" ? "white" : "black"
  }`;

  return (
    <div className={cardClassName}>
      <div className="flex justify-end p-4">
        <button
          className={`bg-${
            theme === "dark" ? "white" : "black"
          } hover:bg-gray-200 text-${
            theme === "dark" ? "black" : "white"
          } font-bold py-2 px-4 rounded text-[16px]`}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
      <div className={`flex items-center justify-center h-screen w-full`}>
        <div className="max-w-[1000px] min-w-[300px] mx-auto p-4 md:text-[24px] text-[16px] flex justify-center flex-col h-screen">
          <h1 className="font-bold mb-4">{quiz.name}</h1>
          <div
            className={`bg-${
              theme === "dark" ? "black" : "white"
            } rounded-lg shadow-lg p-4 text-${
              theme === "dark" ? "white" : "black"
            }`}
          >
            <div ref={questionRef}>
              <h2 className="font-bold mb-2">
                Question {currentQuestionIndex + 1}:
              </h2>
              <p className="mb-4">{currentQuestion.question}</p>
            </div>

            <div className="flex flex-col gap-8 justify-between items-center my-8">
              {!currentQuestion.showAnswer ? (
                <button
                  className={`bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[16px]`}
                  onClick={() => handleAnswerButtonClick(currentQuestionIndex)}
                >
                  Show Answer
                </button>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <p className="font-bold">Answer:</p>
                    <p>{currentQuestion.answer}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                {!isFirstQuestion && (
                  <button
                    className={`bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[16px]`}
                    onClick={handlePreviousButtonClick}
                  >
                    Previous Question
                  </button>
                )}
                {!isLastQuestion && (
                  <button
                    className={`bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[16px]`}
                    onClick={handleNextButtonClick}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>

            {currentQuestion.isLastQuestion && (
              <p className="text-center my-6">The quiz is done!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowQuiz;
