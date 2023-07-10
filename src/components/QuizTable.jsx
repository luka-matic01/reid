import PropTypes from "prop-types";
import { BiSolidSlideshow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const QuizTable = ({
  quizzes,
  navigateToEdit,
  deleteQuiz,
  navigateToSlideshow,
}) => {
  return (
    <div className="bg-white border border-gray-200 md:w-[700px] lg:w-[1000px] p-10 rounded-xl">
      <h1 className="text-center text-[24px]">All Quizzes</h1>
      <div className="flex bg-[#c5eebda9] font-semibold my-5 rounded-xl">
        <div className="w-2/3 px-6 py-4 text-center m-4 md:m-0">Quiz Name</div>
        <div className="w-3/3 px-6 py-4 text-center m-4 md:m-0">Actions</div>
      </div>
      <div className="flex flex-col gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="flex bg-purple-100 hover:bg-yellow-100 rounded-xl cursor-pointer"
            onClick={() => navigateToEdit(quiz.id)}
          >
            <div className="w-1/3 md:w-2/3 px-6 py-4 text-center self-center">
              {quiz.name}
            </div>
            <div className="w-1/3 px-6 py-4 flex items-center">
              <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 tooltip"
                data-tip={`Delete ${quiz.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuiz(quiz.id);
                }}
              >
                <MdDelete size={25} />
              </button>
              <button
                className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded tooltip"
                data-tip={`Slideshow ${quiz.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToSlideshow(quiz.id);
                }}
              >
                <BiSolidSlideshow size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

QuizTable.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigateToEdit: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  navigateToSlideshow: PropTypes.func.isRequired,
};

export default QuizTable;
