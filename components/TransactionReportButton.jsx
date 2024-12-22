import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useBudget } from "@/contexts/BudgetContext";
import { useTranslation } from "react-i18next"; 


// Fonction pour générer le PDF
export async function generatePDF(transactions, categories, t) {
    const doc = new jsPDF();
  
    // Titre du rapport
    doc.setFontSize(22);
    doc.text(t("additional.reportTitle"), 20, 20);
  
    // Résumé
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
  
    doc.setFontSize(11);
    doc.text(`${t("overview.totalIncome")}: TRY${totalIncome.toFixed(2)}`, 20, 30);
    doc.text(`${t("overview.totalExpenses")}: TRY${totalExpenses.toFixed(2)}`, 20, 40);
    doc.text(`${t("overview.balance")}: TRY${balance.toFixed(2)}`, 20, 50);
  
    // Transactions
    doc.setFontSize(18);
    doc.text(t("transactions.transactionDetails"), 20, 60);
    doc.setFontSize(11);
  
    let y = 70;
  
    // Colonnes
    doc.setFont("helvetica", "bold");
    doc.text(t("transactions.date"), 20, y);
    doc.text(t("transactions.type"), 50, y);
    doc.text(t("additional.description"), 80, y);
    doc.text(t("transactions.category"), 140, y);
    doc.text(t("transactions.amount"), 180, y);
  
    y += 10;
  
    transactions.forEach((transaction, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
  
      const category = categories.find((c) => c.id === transaction.category);
      const categoryName = category ? t(`${category.name}`) : t("overview.unknownCategory");
  
      doc.setFont("helvetica", "normal");
      doc.text(format(new Date(transaction.date), "MMM d, yyyy"), 20, y);
      doc.text(transaction.type, 50, y);
      doc.text(doc.splitTextToSize(transaction.description, 50), 80, y);
      doc.text(categoryName, 140, y);
      doc.text(`TRY${transaction.amount.toFixed(2)}`, 180, y);
  
      y += 10;
    });
  
    doc.save("financial_transactions_report.pdf");
  }
  

// Composant de bouton pour déclencher la génération du PDF
export function TransactionReportButton() {
  const { transactions, categories } = useBudget();
  const { t } = useTranslation();  

  return (
    <Button onClick={() => generatePDF(transactions, categories, t)}>
      {t("additional.downloadButton")}  
    </Button>
  );
}
