'use client';

import { useBudget } from '@/contexts/BudgetContext';
import { analyzeExpenses } from '@/lib/expenseAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LightbulbIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SavingsSuggestions() {
  const { t } = useTranslation();
  const { transactions, categories } = useBudget();
  const analysis = analyzeExpenses(transactions, categories, t);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5" />
           {t('overview.savingsSuggestions')}
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
            {t('overview.keepItUp')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
