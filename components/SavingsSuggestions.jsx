'use client';

import { useBudget } from '@/contexts/BudgetContext';
import { analyzeExpenses } from '@/lib/expenseAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LightbulbIcon } from 'lucide-react';

export function SavingsSuggestions() {
  const { transactions, categories } = useBudget();
  const analysis = analyzeExpenses(transactions, categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5" />
          Tasarruf Önerileri
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analysis.suggestions.map((suggestion, index) => (
          <Alert key={index}>
            <AlertDescription>
              {suggestion.message}
            </AlertDescription>
          </Alert>
        ))}
        {analysis.suggestions.length === 0 && (
          <p className="text-muted-foreground">
          Böyle devam et! Harcama alışkanlıkların dengeli görünüyor.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
