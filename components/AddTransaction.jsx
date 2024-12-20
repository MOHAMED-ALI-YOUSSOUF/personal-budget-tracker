'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { TransactionForm } from '@/components/TransactionForm';

export function AddTransaction() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}