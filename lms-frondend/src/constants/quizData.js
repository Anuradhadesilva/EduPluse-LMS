const quizData = [
    {
        programTitle: "The best place to discover new learning resources, books, and courses.",
        programId: 0,
        quizzes: [
            {
                id: 1,
                title: "Java Basics Quiz",
                questions: [
                    {
                        question: "What is JVM?",
                        optionA: "Java Virtual Machine",
                        optionB: "Java Volatile Method",
                        optionC: "Just Very Mad",
                        optionD: "Java Version Manager",
                        correctAnswer: "Java Virtual Machine"
                    },
                    {
                        question: "Which keyword is used to inherit a class in Java?",
                        optionA: "this",
                        optionB: "super",
                        optionC: "extends",
                        optionD: "implements",
                        correctAnswer: "extends"
                    },
                ]
            },
            {
                id: 2,
                title: "Java OOP Concepts Quiz",
                questions: [
                    {
                        question: "What is Encapsulation in Java?",
                        optionA: "Wrapping code and data together",
                        optionB: "Inheriting methods",
                        optionC: "Hiding implementation",
                        optionD: "Breaking code into functions",
                        correctAnswer: "Wrapping code and data together"
                    },
                    {
                        question: "Which keyword is used for inheritance in Java?",
                        optionA: "super",
                        optionB: "extends",
                        optionC: "inherits",
                        optionD: "this",
                        correctAnswer: "extends"
                    },
                ]
            }
        ]
    },
    {
        programTitle: "The best place to discover new learning resources, books.",
        programId: 1,
        quizzes: [
            {
                id: 3,
                title: "React Fundamentals Quiz",
                questions: [
                    {
                        question: "What is JSX?",
                        optionA: "A JavaScript XML syntax extension",
                        optionB: "A backend library",
                        optionC: "A routing tool",
                        optionD: "A state manager",
                        correctAnswer: "A JavaScript XML syntax extension"
                    },
                ]
            }
        ]
    }
];

export default quizData;