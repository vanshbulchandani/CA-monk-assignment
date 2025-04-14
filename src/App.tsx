import { useState, useEffect } from 'react';
import { QuestionCard } from '@/components/QuestionCard';
import { LandingPage } from '@/components/LandingPage';
import { ResultsPage } from '@/components/ResultsPage';
import type { Question, GameState, ApiResponse } from '@/types';

const QUESTIONS_DATA: ApiResponse = {
  "status": "SUCCESS",
  "data": {
    "testId": "oihq2eo9h1029921-210-20112",
    "questions": [
      {
        "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
        "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
        "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
      },
      {
        "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
        "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
        "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
      },
      {
        "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
        "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
        "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
      },
      {
        "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
        "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
        "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
      },
      {
        "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
        "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Raising", "Massive", "Prompting", "Compromised"],
        "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
      },
      {
        "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
        "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
        "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
      },
      {
        "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
        "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
        "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
      },
      {
        "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
        "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Opening", "Improved", "Gradual", "Reducing"],
        "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
      },
      {
        "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
        "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Providing", "Brought together", "Promoting", "International"],
        "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
      },
      {
        "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
        "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
        "questionType": "text",
        "answerType": "options",
        "options": ["Enhancing", "Improved", "Providing", "Widespread"],
        "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
      }
    ]
  },
  "message": "Questions fetched successfully",
  "activity": {
    "id": "3c576049-9ea9-4b5c-9fb7-4b316adaaaa0",
    "userId": "c6ad08a5-67ac-4a4d-aa3a-16d7fe91d51c",
    "type": "VERSANT_CATEGORY_TEST",
    "coinType": "DEDUCTED",
    "coins": 20,
    "description": "Used Versant Category Test",
    "createdAt": "2025-04-10T06:42:21.041Z"
  }
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    timeLeft: 30,
    isComplete: false
  });

  const [hasStarted, setHasStarted] = useState(false);
  const questions = QUESTIONS_DATA.data.questions;

  useEffect(() => {
    let timer: number;
    if (hasStarted && !gameState.isComplete && gameState.timeLeft > 0) {
      timer = window.setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasStarted, gameState.isComplete, gameState.timeLeft]);

  const handleStart = () => {
    setHasStarted(true);
    setGameState({
      currentQuestion: 0,
      answers: [],
      score: 0,
      timeLeft: 30,
      isComplete: false
    });
  };

  const handleAnswer = (answers: string[]) => {
    const currentAnswers = [...gameState.answers, answers];
    const isLastQuestion = gameState.currentQuestion === questions.length - 1;
    
    if (isLastQuestion) {
      const score = currentAnswers.reduce((acc, answer, index) => {
        return acc + (JSON.stringify(answer) === JSON.stringify(questions[index].correctAnswer) ? 1 : 0);
      }, 0);
      
      setGameState((prev) => ({
        ...prev,
        answers: currentAnswers,
        score,
        isComplete: true
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: currentAnswers,
        timeLeft: 30
      }));
    }
  };

  const handleTimeUp = () => {
    const currentAnswers = [...gameState.answers, []];
    const isLastQuestion = gameState.currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      const score = currentAnswers.reduce((acc, answer, index) => {
        return acc + (JSON.stringify(answer) === JSON.stringify(questions[index].correctAnswer) ? 1 : 0);
      }, 0);

      setGameState((prev) => ({
        ...prev,
        answers: currentAnswers,
        score,
        isComplete: true
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: currentAnswers,
        timeLeft: 30
      }));
    }
  };

  if (!hasStarted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LandingPage onStart={handleStart} />
      </div>
    );
  }

  if (gameState.isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ResultsPage
          score={gameState.score}
          totalQuestions={questions.length}
          questions={questions}
          userAnswers={gameState.answers}
          onRestart={handleStart}
        />
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestion];
  const blanks = (currentQuestion.question.match(/_{13}/g) || []).length;

  const adaptedQuestion: Question = {
    questionId: currentQuestion.questionId,
    question: currentQuestion.question.replace(/_{13}/g, '_'),
    questionType: currentQuestion.questionType,
    answerType: currentQuestion.answerType,
    options: currentQuestion.options,
    correctAnswer: currentQuestion.correctAnswer
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <QuestionCard
        question={adaptedQuestion}
        onAnswer={handleAnswer}
        timeLeft={gameState.timeLeft}
        onTimeUp={handleTimeUp}
        questionNumber={gameState.currentQuestion + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
}

export default App;