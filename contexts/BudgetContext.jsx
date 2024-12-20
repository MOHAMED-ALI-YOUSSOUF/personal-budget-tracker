'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DEFAULT_CATEGORIES, INCOME_CATEGORIES } from '@/lib/constants';

const BudgetContext = createContext(undefined);

export function BudgetProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with default categories if none exist
    const storedCategories = localStorage.getItem('categories');
    if (!storedCategories) {
      const defaultCats = [...DEFAULT_CATEGORIES, ...INCOME_CATEGORIES].map((cat) => ({
        ...cat,
        id: crypto.randomUUID(),
      }));
      setCategories(defaultCats);
      localStorage.setItem('categories', JSON.stringify(defaultCats));
    } else {
      setCategories(JSON.parse(storedCategories));
    }

    // Load stored transactions
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    checkBudgetLimits();
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const checkBudgetLimits = () => {
    const newAlerts = [];
    categories.forEach((category) => {
      if (category.budgetLimit) {
        const totalExpenses = transactions
          .filter((t) => t.type === 'expense' && t.category === category.id)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const percentage = (totalExpenses / category.budgetLimit) * 100;
        if (percentage >= 80) {
          const alert = {
            categoryId: category.id,
            percentage,
            message: `You've reached ${percentage.toFixed(1)}% of your budget limit for ${category.name}`,
          };
          newAlerts.push(alert);
          toast({
            title: 'Budget Alert',
            description: alert.message,
            variant: 'destructive',
          });
        }
      }
    });
    setAlerts(newAlerts);
  };

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: crypto.randomUUID() };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateBudgetLimit = (categoryId, limit) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, budgetLimit: limit } : cat
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        categories,
        alerts,
        addTransaction,
        addCategory,
        updateBudgetLimit,
        deleteTransaction,
        deleteCategory,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
