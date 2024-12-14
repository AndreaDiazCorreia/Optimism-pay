import { TransactionForm } from "@/components/demo/transaction-form";

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Try <span className="gradient-text">OptimismPay</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Experience the simplicity of cross-chain transactions with our
            interactive demo
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}
