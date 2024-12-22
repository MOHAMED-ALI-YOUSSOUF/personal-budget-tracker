'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { TransactionForm } from '@/components/TransactionForm';
import { useTranslation } from 'react-i18next';

export function AddTransaction() {
  const [open, setOpen] = useState(false);
   const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
           {t('transactions.addTransaction')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> {t('transactions.addTransaction')}</DialogTitle>
        </DialogHeader>
        <TransactionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}