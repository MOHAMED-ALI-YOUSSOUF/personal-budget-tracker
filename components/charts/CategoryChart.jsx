'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useBudget } from '@/contexts/BudgetContext';
import { useTranslation } from 'react-i18next';

export function CategoryChart() {
  const { transactions, categories } = useBudget();
     const { t } = useTranslation();

  const data = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const category = categories.find(c => c.id === t.category);
        if (!category) return acc;

        acc[category.id] = (acc[category.id] || 0) + t.amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
          name: category ? category.name : 'Unknown',
          value: amount,
          color: category ? category.color : '#666'
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
         {t('overview.noExpenseData')}
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => 
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
