import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { BudgetProvider } from "@/contexts/BudgetContext";

export default function Home() {
  return (
    <BudgetProvider>
      <Dashboard />
      <Footer />
    </BudgetProvider>
  );
}
