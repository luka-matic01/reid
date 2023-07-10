import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import {
  fetchSelectedQuestions,
  fetchQuestions,
  createQuestions,
} from "../api/questions";
import { getCreatedQuestionsData } from "../utils/questions";
import QuizForm from "../components/QuizForm";
import QuestionList from "../components/QuestionList";

const CreateQuiz = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const getAllQuestions = async () => {
    try {
      const questions = await fetchQuestions();
      setAllQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Getting all the questions from the server
  useEffect(() => {
    getAllQuestions();
  }, []);

  // Toggle the selection of a question
  const toggleSelectedQuestions = (questionId) => {
    if (selectedQuestionIds.includes(questionId)) {
      setSelectedQuestionIds((prevSelected) =>
        prevSelected.filter((id) => id !== questionId)
      );
    } else {
      setSelectedQuestionIds((prevSelected) => [...prevSelected, questionId]);
    }
  };

  //Creating a quiz
  const onSubmit = async (data) => {
    // Fetch the selected questions
    const selectedQuestions = await fetchSelectedQuestions(selectedQuestionIds);

    // Get the questions data
    const questionsData = getCreatedQuestionsData(data.questions);
    try {
      // Create the questions
      const createdQuestions = await createQuestions(questionsData);
      // Combine the selected and created questions
      const allQuestions = [...selectedQuestions, ...createdQuestions];
      // Prepare the quiz data
      const quizData = {
        name: data.name,
        questions: allQuestions,
      };

      // Send a POST request to create the quiz
      const response = await axios.post(
        "http://localhost:3000/quizzes?_embed=questions",
        quizData
      );
      // If the quiz is created successfully
      if (response.status === 201) {
        setMessage("Quiz created successfully!");
        setWarningMessage("");
        setSelectedQuestionIds([]); // Clear the selected question IDs
        reset();
        remove(0);
        // Fetch the newest questions after the quiz is created
        getAllQuestions();
        // Take in consideration 15-25 questions per quiz
        if (allQuestions.length < 15 || allQuestions.length > 25) {
          setWarningMessage(
            "Average quiz has 15 to 25 questions. Keep it in mind!"
          );
          setTimeout(() => {
            setWarningMessage(""); // Clear the message after 7 seconds
          }, 7000);
        }
        setTimeout(() => {
          setMessage(""); // Clear the message after 7 seconds
        }, 7000);
      }
    } catch (error) {
      setError("quiz", {
        message: "Failed creating a quiz",
      });
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-10 bg-[#e8f9fd]">
      <div className="flex md:flex-row flex-col justify-center gap-10 w-full">
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
            quiz={{}}
            page="create"
            warningMessage={warningMessage}
          />
        </div>
        <div className="w-full md:w-auto">
          <QuestionList
            allQuestions={allQuestions}
            register={register}
            selectedQuestionIds={selectedQuestionIds}
            toggleSelectedQuestions={toggleSelectedQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
