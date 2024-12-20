import { BudgetProvider } from '@/contexts/BudgetContext';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <BudgetProvider>
      <Dashboard />
    </BudgetProvider>
  );
}