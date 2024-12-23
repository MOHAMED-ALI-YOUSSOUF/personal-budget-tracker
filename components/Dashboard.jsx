'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { TransactionReportButton } from './TransactionReportButton';
import { AddTransaction } from '@/components/AddTransaction';
import { useTranslation } from 'react-i18next';
// import LangSelector from './LangSelector';

export default function Dashboard() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-scree flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
        <h2 className="sm:text-3xl font-bold tracking-tight sm:text-start text-center mx-3 text-2xl">
          {t('overview.title')}
        </h2>
          <div className="ml-auto flex items-center space-x-4">
            
            {/* <LangSelector /> */}
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
      
        <div className="flex items-center justify-between space-y-2">
          <TransactionReportButton />
          <AddTransaction />
        </div>
        <div className="tabs">
          <nav className="flex space-x-4 ">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              {t('additional.overview')}
            </Link>
            <Link href="/transactions" className={pathname === '/transactions' ? 'active' : ''}>
              {t('additional.transactions')}
            </Link>
            <Link href="/categories" className={pathname === '/categories' ? 'active' : ''}>
              {t('additional.categories')}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
