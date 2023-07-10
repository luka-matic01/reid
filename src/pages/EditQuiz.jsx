import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import {
  createQuestions,
  editQuestions,
  fetchQuestions,
  fetchSelectedQuestions,
} from "../api/questions";
import { getCreatedQuestionsData } from "../utils/questions";
import QuizForm from "../components/QuizForm";
import QuestionList from "../components/QuestionList";
import { fetchQuiz } from "../api/quizzes";

const EditQuiz = () => {
  const [quiz, setQuiz] = useState();
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "questions",
  });

  // Get all questions so you can select ones you like for the quiz
  const getAllQuestions = async () => {
    try {
      const questions = await fetchQuestions();
      setAllQuestions(questions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // /quizzes/{id} GET method
  const fetchSpecificQuiz = useCallback(async () => {
    const quiz = await fetchQuiz(id, "edit", reset, prepend);
    setQuiz(quiz);
  }, [id, reset, prepend]);

  useEffect(() => {
    fetchSpecificQuiz();
    getAllQuestions();
  }, [fetchSpecificQuiz]);

  // Keep in track selected questions
  const toggleSelectedQuestions = (questionId) => {
    if (selectedQuestionIds.includes(questionId)) {
      setSelectedQuestionIds((prevSelected) =>
        prevSelected.filter((id) => id !== questionId)
      );
    } else {
      setSelectedQuestionIds((prevSelected) => [...prevSelected, questionId]);
    }
  };

  const onSubmit = async (data) => {
    const questions = data.questions;
    // Created questions doesn't have id at first
    const isCreatedQuestion = Array.isArray(questions)
      ? questions.filter((question) => !question?.id)
      : [];

    const selectedQuestions = await fetchSelectedQuestions(selectedQuestionIds);
    const createdQuestionsData = await getCreatedQuestionsData(
      isCreatedQuestion
    );
    try {
      // Update the quiz
      const createdQuestions = await createQuestions(createdQuestionsData);
      const updatedQuestions = [
        ...(Array.isArray(questions)
          ? questions.filter((question) => question?.id)
          : []),
        ...selectedQuestions,
        ...createdQuestions,
      ];
      const updatedData = { ...data, questions: updatedQuestions };
      const updateQuizResponse = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/quizzes/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updateQuizResponse.status === 200) {
        throw new Error("Failed to update quiz");
      }

      // When quiz is succesfully updated, clear and fetch the data
      await editQuestions(updatedData);
      await fetchSpecificQuiz();
      setSelectedQuestionIds([]);
      getAllQuestions();
      if (updatedQuestions.length < 15 || updatedQuestions > 25) {
        setWarningMessage(
          "Average quiz has 15 to 25 questions. Keep it in mind!"
        );
        setTimeout(() => {
          setWarningMessage("");
        }, 7000);
      }
      setMessage("Quiz successfully edited!");
      setTimeout(() => {
        setMessage("");
      }, 7000);
    } catch (error) {
      console.error(error);
    }
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
    <div className="flex justify-center min-h-screen p-10 bg-[#e8f9fd]">
      <div className="flex md:flex-row flex-col justify-center gap-10 w-full">
        {quiz && (
          <div className="w-full md:w-auto">
            <QuizForm
              register={register}
              control={control}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              message={message}
              warningMessage={warningMessage}
              quiz={quiz}
              page="edit"
            />
          </div>
        )}
        <div className="w-full md:w-auto">
          <QuestionList
            allQuestions={allQuestions}
            selectedQuestionIds={selectedQuestionIds}
            toggleSelectedQuestions={toggleSelectedQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
