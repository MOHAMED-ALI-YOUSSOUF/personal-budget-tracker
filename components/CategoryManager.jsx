'use client';

import { useState } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

export function CategoryManager() {
  const { categories, addCategory, updateBudgetLimit, deleteCategory } = useBudget();
  const [newCategoryName, setNewCategoryName] = useState('');
 

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    addCategory({
      name: newCategoryName,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    });
    setNewCategoryName('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddCategory} className="flex gap-4">
        <div className="flex-1">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Yeni kategori adı"
          />
        </div>
        <Button type="submit">Kategori Ekle</Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`budget-${category.id}`}>Bütçe Limiti</Label>
                  <Input
                    id={`budget-${category.id}`}
                    type="number"
                    value={category.budgetLimit || ''}
                    onChange={(e) => updateBudgetLimit(category.id, parseFloat(e.target.value))}
                    placeholder="Limit Belirle"
                  />
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}