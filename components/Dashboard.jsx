'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/Overview';
import { TransactionList } from '@/components/TransactionList';
import { CategoryManager } from '@/components/CategoryManager';
import { AddTransaction } from '@/components/AddTransaction';
import { ModeToggle } from '@/components/mode-toggle';
import { TransactionReportButton } from './TransactionReportButton';
import { useTranslation } from 'react-i18next';
import LangSelector from './LangSelector';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
        <h2 className="sm:text-3xl font-bold tracking-tight  mx-3 text-2xl">
          {t('overview.title')}
        </h2>
          <div className="ml-auto flex items-center space-x-4">
            <LangSelector/>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
         
        <div className="flex items-center justify-between space-y-2  ">
        <TransactionReportButton/>   
          <AddTransaction />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t('additional.overview')}</TabsTrigger>
            <TabsTrigger value="transactions"> {t('additional.transactions')}</TabsTrigger>
            <TabsTrigger value="categories">{t('additional.categories')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>{t('additional.recentTransactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>{t('additional.categoryManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}