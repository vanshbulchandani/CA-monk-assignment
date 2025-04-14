import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, XCircle, CheckCircle } from 'lucide-react';
import type { Question } from '@/types';

interface ResultsPageProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: string[][];
  onRestart: () => void;
}

export function ResultsPage({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
}: ResultsPageProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center space-y-4">
          <Trophy className="w-16 h-16 mx-auto text-primary" />
          <CardTitle className="text-3xl font-bold">Your Results</CardTitle>
          <div className="text-2xl font-semibold">
            Score: {score} / {totalQuestions} ({percentage.toFixed(1)}%)
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer);
              return (
                <div key={question.questionId} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    <div className="space-y-2 flex-grow">
                      <p className="text-sm font-medium">Question {index + 1}</p>
                      <p className="text-base">{question.question}</p>
                      {!isCorrect && (
                        <div className="space-y-1">
                          <p className="text-sm text-red-500">Your answer: {userAnswers[index].join(', ')}</p>
                          <p className="text-sm text-green-500">Correct answer: {question.correctAnswer.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button onClick={onRestart} size="lg" className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}