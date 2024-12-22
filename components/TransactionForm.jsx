'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function TransactionForm({ onSuccess }) {
  const { categories, addTransaction } = useBudget();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
   const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: date.toISOString(),
    });

    onSuccess();
  };

  const relevantCategories = categories.filter((cat) =>
    type === 'income'
      ? cat.name.includes('Salary') || cat.name.includes('Freelance') || cat.name.includes('Investments')
      : !cat.name.includes('Salary') && !cat.name.includes('Freelance') && !cat.name.includes('Investments')
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RadioGroup value={type} onValueChange={(value) => setType(value)} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="expense" id="expense" aria-label={t('transactions.expense')}/>
          <Label htmlFor="expense">{t('transactions.expense')}</Label> 
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="income" id="income" />
          <Label htmlFor="income">{t('transactions.income')}</Label> 
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="amount">{t('transactions.amount')}</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('transactions.description')}</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('transactions.enterDescription')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t('transactions.category')}</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder={t('transactions.selectCategory')}/>
          </SelectTrigger>
          <SelectContent>
            {relevantCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t('transactions.date')}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>{t('transactions.pickDate')}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">{t('transactions.addTransaction')}</Button>
    </form>
  );
}
