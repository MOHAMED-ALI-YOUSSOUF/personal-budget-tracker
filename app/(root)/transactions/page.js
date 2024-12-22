'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionList } from '@/components/TransactionList';
import { useTranslation } from 'react-i18next';

export default function TransactionsPage() {
  const { t } = useTranslation();

  return (
    <Card className="mx-8">
      <CardHeader>
        <CardTitle>{t('additional.recentTransactions')}</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionList />
      </CardContent>
    </Card>
  );
}
