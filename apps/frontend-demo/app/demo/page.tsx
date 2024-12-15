'use client';

import { Card } from "@/components/ui/card";
import { TransactionForm } from "@/components/demo/TransactionForm";
import { TransactionDetails } from "@/components/demo/TransactionDetails";
import { useState } from "react";
import { Wallet } from "lucide-react";

export default function DemoPage() {
  const [transactionDetails, setTransactionDetails] = useState(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Wallet className="w-12 h-12 text-[#ff0420]" />
          <h1 className="text-4xl font-bold text-center">
            The <span className="text-[#ff0420]">Optimism</span> Pay Demo
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <Card className="p-6 bg-zinc-900 border-zinc-800 w-full">
            <TransactionForm onTransactionComplete={setTransactionDetails} />
          </Card>

          {transactionDetails && (
            <Card className="p-6 bg-zinc-900 border-zinc-800 w-full">
              <TransactionDetails details={transactionDetails} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}