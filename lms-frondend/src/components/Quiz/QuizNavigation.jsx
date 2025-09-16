import React from 'react';

export const QuizNavigation = ({ questions, currentQuestionIndex, answers, onQuestionSelect, onFinishAttempt }) => {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white w-full md:w-64">
            <h3 className="font-bold mb-4 text-center">Quiz Navigation</h3>
            <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                    const isAnswered = answers[index] !== undefined && answers[index] !== null;
                    const isCurrent = index === currentQuestionIndex;

                    let buttonClass = 'border p-2 text-center rounded aspect-square flex items-center justify-center ';
                    if (isCurrent) {
                        buttonClass += 'bg-blue-600 text-white border-blue-700';
                    } else if (isAnswered) {
                        buttonClass += 'bg-gray-200';
                    } else {
                        buttonClass += 'bg-white';
                    }

                    return (
                        <button
                            key={q.id || index}
                            onClick={() => onQuestionSelect(index)}
                            className={buttonClass}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={onFinishAttempt}
                className="w-full mt-6 bg-gray-200 p-2 rounded hover:bg-gray-300 font-semibold"
            >
                Finish attempt...
            </button>
        </div>
    );
};