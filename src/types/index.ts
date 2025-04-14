export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

export interface GameState {
  currentQuestion: number;
  answers: string[][];
  score: number;
  timeLeft: number;
  isComplete: boolean;
}

export interface TestData {
  testId: string;
  questions: Question[];
}

export interface ApiResponse {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
}