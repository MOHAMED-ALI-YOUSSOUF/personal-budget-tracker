'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useBudget } from '@/contexts/BudgetContext';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { useTranslation } from 'react-i18next';

export function MonthlyChart() {
  const { transactions } = useBudget();
   const { t } = useTranslation();

  const data = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
      const dayTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return format(transactionDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });

      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        date: format(day, 'dd'),
        income,
        expenses
      };
    });
  }, [transactions]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="hsl(var(--chart-1))" name={t('additional.income')} />
          <Bar dataKey="expenses" fill="hsl(var(--chart-2))" name={t('additional.expenses')} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}