"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const chains = [
  { id: "optimism", name: "Optimism" },
  { id: "ethereum", name: "Ethereum" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "base", name: "Base" },
];

export const TransactionForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromChain">From Chain</Label>
            <Select defaultValue="ethereum">
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toChain">To Chain</Label>
            <Select defaultValue="optimism">
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              min="0"
              step="0.01"
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ETH
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input id="recipient" type="text" placeholder="0x..." />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full hover-gradient"
        disabled={loading}
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            Send Transaction
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};
