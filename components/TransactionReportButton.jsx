import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useBudget } from "@/contexts/BudgetContext";

export async function generatePDF(transactions, categories) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Finansal Islemler Raporu", 20, 20);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  doc.setFontSize(11);
  doc.text(`Toplam Gelir: TRY${totalIncome.toFixed(2)}`, 20, 30);
  doc.text(`Toplam Gider: TRY${totalExpenses.toFixed(2)}`, 20, 40);
  doc.text(`Bakiye: TRY${balance.toFixed(2)}`, 20, 50);

  doc.setFontSize(18);
  doc.text("Islem Detaylari", 20, 60);
  doc.setFontSize(11);

  let y = 70;

  doc.setFont("helvetica", "bold");
  doc.text("Tarih", 20, y);
  doc.text("Tür", 50, y);
  doc.text("Açiklama", 80, y);
  doc.text("Kategori", 140, y);
  doc.text("Tutar", 180, y);

  y += 10;

  transactions.forEach((transaction, index) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    const category = categories.find((c) => c.id === transaction.category);
    const categoryName = category ? category.name : "Bilinmeyen";
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(20, y - 8, 190, 10, "F");
    }

    doc.setFont("helvetica", "normal");
    doc.text(format(new Date(transaction.date), "MMM d, yyyy"), 20, y);
    doc.text(transaction.type, 50, y);
    doc.text(doc.splitTextToSize(transaction.description, 50), 80, y);
    doc.text(categoryName, 140, y);
    doc.text(`TRY${transaction.amount.toFixed(2)}`, 180, y);

    y += 10;
  });

  doc.save("Finansal_Islemler_Raporu.pdf");
}

export function TransactionReportButton() {
  const { transactions, categories } = useBudget();

  return (
    <Button onClick={() => generatePDF(transactions, categories)}>
      PDF Raporunu İndir
    </Button>
  );
}
