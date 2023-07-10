import PropTypes from "prop-types";
import { FaSadTear } from "react-icons/fa";
import { useState, useEffect } from "react";

const QuestionList = ({
  allQuestions,
  selectedQuestionIds,
  toggleSelectedQuestions,
}) => {
  const [questionsToShow, setQuestionsToShow] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    setShowLoadMore(allQuestions.length > 5);
  }, [allQuestions]);

  const loadMoreQuestions = () => {
    if (questionsToShow + 5 >= allQuestions.length) {
      setQuestionsToShow(allQuestions.length);
      setShowLoadMore(false);
    } else {
      setQuestionsToShow(questionsToShow + 5);
    }
  };

  const loadAllQuestions = () => {
    setQuestionsToShow(allQuestions.length);
    setShowLoadMore(false);
  };

  return (
    <div className="flex flex-col gap-2 bg-green-100 rounded-[15px]">
      <h1 className="p-4 text-[18px] font-bold text-center">
        If you find any of these questions interesting, select them to add to
        the Quiz.
      </h1>
      <div className="flex justify-center">
        <div className="xl:min-w-[500px] w-[300px] lg:w-[350px]  flex flex-col gap-4 px-10 p-4">
          {allQuestions.length === 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-700">There are currently no questions.</p>
              <FaSadTear size={20} />
            </div>
          ) : (
            allQuestions.slice(0, questionsToShow).map((question) => (
              <div key={question.id} className="flex gap-2 items-center">
                <button
                  className={`${
                    selectedQuestionIds.includes(question.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } px-4 py-2 rounded-md`}
                  onClick={() => toggleSelectedQuestions(question.id)}
                >
                  {question.question}
                </button>
                {selectedQuestionIds.includes(question.id) && (
                  <span className="ml-2 text-green-700">Selected</span>
                )}
              </div>
            ))
          )}
          {showLoadMore && (
            <div className="flex justify-between gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[16px]"
                onClick={loadMoreQuestions}
              >
                Load More Questions
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[16px]"
                onClick={loadAllQuestions}
              >
                Load All Questions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

QuestionList.propTypes = {
  allQuestions: PropTypes.array.isRequired,
  selectedQuestionIds: PropTypes.array.isRequired,
  toggleSelectedQuestions: PropTypes.func.isRequired,
};

export default QuestionList;
