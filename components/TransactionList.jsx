'use client';

import { format } from 'date-fns';
import { useBudget } from '@/contexts/BudgetContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TransactionList() {
  const { transactions, categories, deleteTransaction } = useBudget();

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead>Tür</TableHead>
            <TableHead>Açiklama</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead className="text-right">Tutar</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{getCategoryName(transaction.category)}</TableCell>
              <TableCell className={cn(
                "text-right",
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              )}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
              Henüz işlem yok
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}