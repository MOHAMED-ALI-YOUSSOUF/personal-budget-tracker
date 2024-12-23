"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/Overview";
import { TransactionList } from "@/components/TransactionList";
import { CategoryManager } from "@/components/CategoryManager";
import { AddTransaction } from "@/components/AddTransaction";
import { ModeToggle } from "@/components/mode-toggle";
import { TransactionReportButton } from "./TransactionReportButton";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
 

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center justify-between px-4 space-x-4">
            <h2 className=" font-bold tracking-tight mx-3 text-3xl">
            Kişisel Bütçe Takipçisi
            </h2>
            <ModeToggle />
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <TransactionReportButton />
          <AddTransaction />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">
            Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="transactions">
            İşlemler
            </TabsTrigger>
            <TabsTrigger value="categories">
            Kategoriler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Son İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Kategori Yönetimi</CardTitle>
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
