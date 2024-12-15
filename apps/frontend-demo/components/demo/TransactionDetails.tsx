'use client';

import { CheckCircle2, ArrowRight } from "lucide-react";

export function TransactionDetails({ details }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold">Transaction Successful</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
          <span className="text-zinc-400">Token</span>
          <span className="font-medium">{details.token}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
          <span className="text-zinc-400">Amount Sent</span>
          <span className="font-medium">{details.amount} {details.token}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
          <span className="text-zinc-400">Gas Fee (0.5%)</span>
          <span className="font-medium">{details.gasFee} {details.token}</span>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Recipient</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="font-mono text-sm break-all">
            {details.recipient}
          </div>
        </div>

        <div className="text-sm text-zinc-500 text-right">
          {new Date(details.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}