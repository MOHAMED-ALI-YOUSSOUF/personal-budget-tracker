"use client";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { BudgetProvider } from "@/contexts/BudgetContext";
import dynamic from "next/dynamic";

const LangSelector = dynamic(() => import("@/components/LangSelector"), {
  ssr: false,
});
export default function Home() {
  return (
    <BudgetProvider>
      <Dashboard />
      <Footer />
      <LangSelector/>
    </BudgetProvider>
  );
}
