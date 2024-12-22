import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { BudgetProvider } from "@/contexts/BudgetContext";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Budget Tracker",
  description: "Track your income, expenses, and budget goals efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BudgetProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col ">
              <Dashboard />
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </BudgetProvider>
      </body>
    </html>
  );
}
