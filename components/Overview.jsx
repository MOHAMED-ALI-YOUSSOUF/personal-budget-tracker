'use client';

import { useMemo } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { MonthlyChart } from '@/components/charts/MonthlyChart';
import { CategoryChart } from '@/components/charts/CategoryChart';

export function Overview() {
  const { transactions, categories } = useBudget();

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses
    };
  }, [transactions]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totals.income)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totals.expenses)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totals.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}