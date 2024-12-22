'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryManager } from '@/components/CategoryManager';
import { useTranslation } from 'react-i18next';

export default function CategoriesPage() {
  const { t } = useTranslation();

  return (
    <Card className="mx-8">
      <CardHeader>
        <CardTitle>{t('additional.categoryManagement')}</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryManager />
      </CardContent>
    </Card>
  );
}
