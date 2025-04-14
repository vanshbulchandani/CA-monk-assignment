import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <Brain className="w-16 h-16 mx-auto text-primary" />
          <CardTitle className="text-3xl font-bold">Sentence Construction Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-muted-foreground">
              Test your language skills by completing sentences with the correct words.
            </p>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li>• Complete 10 challenging sentences</li>
              <li>• 30 seconds per question</li>
              <li>• Choose from 4 word options</li>
              <li>• Get instant feedback on your performance</li>
            </ul>
          </div>
          <Button onClick={onStart} size="lg" className="w-full">
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}