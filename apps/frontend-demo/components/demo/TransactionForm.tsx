'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const FIXED_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const TOKENS = ["USDC", "DAI", "USDT"];

export function TransactionForm({ onTransactionComplete }) {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const gasFee = parseFloat(amount) * 0.005; // 0.5% gas fee
    const finalAmount = parseFloat(amount) - gasFee;

    const details = {
      token: selectedToken,
      amount: finalAmount.toFixed(2),
      gasFee: gasFee.toFixed(2),
      recipient: FIXED_ADDRESS,
      timestamp: new Date().toISOString(),
    };

    onTransactionComplete(details);
    toast.success("Transaction completed successfully!");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Recipient Address</label>
        <Input
          value={FIXED_ADDRESS}
          disabled
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Amount to Send</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Select Token</label>
        <Select required onValueChange={setSelectedToken}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {TOKENS.map((token) => (
              <SelectItem key={token} value={token}>
                {token}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#ff0420] hover:bg-[#cc0319]"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Send"}
      </Button>
    </form>
  );
}