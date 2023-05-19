import Button from './Button';

function QuestionInEditExam(props) {
    return (
        <tr className="grid grid-cols-9 border-b bg-white dark:border-gray-700 dark:bg-gray-900">
            <td className="px-6 py-3">
                <Button
                    type={props?.type}
                    questions={props?.questions}
                    setQuestions={props?.setQuestions}
                    addQuestions={props?.addQuestions}
                    setAddQuestions={props?.setAddQuestions}
                    question={props?.question}
                    deleteQuestions={props?.deleteQuestions}
                    setDeleteQuestions={props?.setDeleteQuestions}
                ></Button>
            </td>
            <td className="whitespace-nowrap px-6 py-3 font-medium text-gray-900 dark:text-white">
                {props?.question?.id}
            </td>
            <td className="col-span-2 px-6 py-4">
                <p
                    rows={2}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                    {props?.question?.content || props?.question?.title}
                </p>
            </td>
            {props?.question?.answers
                ?.sort((a, b) => a.id - b.id)
                ?.map((a, index) => {
                    return (
                        <td key={index} className="px-6 py-4">
                            <p
                                rows={2}
                                className="block max-w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            >
                                {a?.content}
                            </p>
                        </td>
                    );
                })}
            <td className="px-6 py-4">
                <div>
                    <div className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        {props?.question?.answers?.map((a) => {
                            return a?.correct ? a?.content?.substring(0, 1) : null;
                        })}
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default QuestionInEditExam;
