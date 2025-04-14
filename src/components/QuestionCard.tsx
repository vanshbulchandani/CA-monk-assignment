import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Timer } from './Timer';
import type { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: string[]) => void;
  timeLeft: number;
  onTimeUp: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  onAnswer,
  timeLeft,
  onTimeUp,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  const blanks = (question.question.match(/_/g) || []).length;
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(blanks).fill(null)
  );
  const [usedOptions, setUsedOptions] = useState<Set<string>>(new Set());

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswers(Array(blanks).fill(null));
    setUsedOptions(new Set());
  }, [question.questionId, blanks]);

  const handleOptionClick = (option: string) => {
    if (usedOptions.has(option)) return;

    const firstEmptyIndex = selectedAnswers.findIndex((answer) => answer === null);
    if (firstEmptyIndex === -1) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[firstEmptyIndex] = option;
    setSelectedAnswers(newAnswers);
    setUsedOptions(new Set([...usedOptions, option]));
  };

  const handleBlankClick = (index: number) => {
    if (selectedAnswers[index] === null) return;

    const option = selectedAnswers[index];
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = null;
    setSelectedAnswers(newAnswers);
    setUsedOptions(new Set([...usedOptions].filter((o) => o !== option)));
  };

  const isComplete = selectedAnswers.every((answer) => answer !== null);

  const renderSentence = () => {
    const parts = question.question.split('_');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <button
            onClick={() => handleBlankClick(index)}
            className={`mx-2 min-w-20 px-4 py-1 rounded ${
              selectedAnswers[index]
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary border-2 border-dashed border-muted-foreground'
            }`}
          >
            {selectedAnswers[index] || '_____'}
          </button>
        )}
      </span>
    ));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="text-center">
        <h2 className="text-xl font-semibold">
          Question {questionNumber} of {totalQuestions}
        </h2>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Timer timeLeft={timeLeft} onTimeUp={onTimeUp} />
        
        <div className="text-lg font-medium leading-relaxed">{renderSentence()}</div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {question.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={usedOptions.has(option)}
              variant={usedOptions.has(option) ? "secondary" : "default"}
              className="w-full"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full"
          disabled={!isComplete}
          onClick={() => onAnswer(selectedAnswers as string[])}
        >
          {questionNumber === totalQuestions ? 'Finish' : 'Next Question'}
        </Button>
      </CardFooter>
    </Card>
  );
}