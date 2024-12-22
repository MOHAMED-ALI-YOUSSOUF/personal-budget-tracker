
export function analyzeExpenses(transactions, categories, t) {
  const analysis = {
    highSpendingCategories: [],
    suggestions: []
  };

  // Calculate total and average spending per category
  categories.forEach((category) => {
    const categoryTransactions = transactions.filter(
      (t) => t.type === "expense" && t.category === category.id
    );

    const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    const average = categoryTransactions.length > 0
      ? total / categoryTransactions.length
      : 0;

    if (total > average * 1.2) { // Spending exceeds average by 20%
      analysis.highSpendingCategories.push({
        category: category.name,
        amount: total
      });

      analysis.suggestions.push({
        category: category.name,
        message: t('additional.reduceSpending', { categoryName: category.name }) // Correct use of t
      });
    }
  });

  return analysis;
}
