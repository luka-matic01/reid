import PropTypes from "prop-types";

const QuizForm = ({
  register,
  errors,
  fields,
  append,
  remove,
  handleSubmit,
  onSubmit,
  message,
  quiz,
  page,
  warningMessage,
}) => {
  return (
    <div className="bg-yellow-100 rounded-[15px] p-10">
      <div className="w-full xl:min-w-[600px] lg:max-w-[350px]">
        <h2 className="text-3xl font-bold mb-4">
          {page === "edit" ? `Edit ${quiz.name}` : "Create Quiz"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold" htmlFor="name">
              Quiz Name:
            </label>
            <input
              className="w-full px-4 py-2.5 text-base border-transparent rounded-lg focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              type="text"
              {...register("name", { required: true })}
              defaultValue={quiz?.name}
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500">Quiz name is required.</span>
            )}
          </div>

          {fields?.map((question, index) => (
            <div key={question.id}>
              <div className="mb-2">
                <label
                  className="block mb-2 font-bold"
                  htmlFor={`question${index}`}
                >
                  {` Question ${index + 1}:`}
                </label>
                <textarea
                  className="w-full px-4 py-2.5 text-base border-transparent rounded-lg focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  {...register(`questions.${index}.question`, {
                    required: true,
                  })}
                  defaultValue={question.question}
                  placeholder="Question"
                />
                {errors.questions?.[index]?.question && (
                  <span className="text-red-500">Question is required.</span>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block mb-2 font-bold"
                  htmlFor={`answer${index}`}
                >
                  Answer:
                </label>
                <textarea
                  className="w-full px-4 py-2.5 text-base border-transparent rounded-lg focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  {...register(`questions.${index}.answer`, { required: true })}
                  defaultValue={question.answer}
                  placeholder="Answer"
                />
                {errors.questions?.[index]?.answer && (
                  <span className="text-red-500">Answer is required.</span>
                )}
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-md"
                onClick={() => remove(index)}
              >
                Remove Question
              </button>
              <hr className="my-4" />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md transition-colors duration-300 ease-in-out"
              onClick={() => append({ question: "", answer: "" })}
            >
              Add Question
            </button>

            <button
              type="submit"
              className="px-7 py-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md transition-colors duration-300 ease-in-out"
            >
              {page === "edit" ? "Edit Quiz" : "Create Quiz"}
            </button>
          </div>

          {errors.quiz && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errors?.quiz?.message}</span>
            </div>
          )}
          {message && (
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{message}</span>
            </div>
          )}
          {warningMessage && (
            <div className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{warningMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

QuizForm.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  quiz: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  warningMessage: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default QuizForm;
