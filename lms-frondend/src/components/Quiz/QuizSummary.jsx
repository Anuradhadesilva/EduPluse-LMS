import React from 'react';

export const QuizSummary = ({ questions, answers, onReturn, onSubmit }) => {
    const answeredCount = Object.values(answers).filter(Boolean).length;
    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Summary of attempt</h1>
            <p className="mb-6">You have answered {answeredCount} out of {questions.length} questions.</p>
            <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border p-3 text-left font-semibold text-gray-700">Question</th>
                        <th className="border p-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, index) => (
                        <tr key={q.id || index} className="even:bg-gray-50">
                            <td className="border p-3">Question {index + 1}</td>
                            <td className={`border p-3 font-medium ${answers[index] ? 'text-green-700' : 'text-red-700'}`}>
                                {answers[index] ? 'Answered' : 'Not yet answered'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-8">
                <button onClick={onReturn} className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 font-semibold">
                    Return to attempt
                </button>
                <button onClick={onSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold">
                    Submit all and finish
                </button>
            </div>
        </div>
    );
};