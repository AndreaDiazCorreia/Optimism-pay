import { CodeBlock } from "@/components/docs/code-block";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const installCode = `npm install @optimismpay/sdk`;

const usageCode = `import { OptimismPay } from '@optimismpay/sdk';

const pay = new OptimismPay({
  apiKey: 'your-api-key'
});

// Initiate a cross-chain transaction
const transaction = await pay.transfer({
  fromChain: 'ethereum',
  toChain: 'optimism',
  amount: '1.0',
  recipient: '0x...'
});`;

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to integrate OptimismPay into your dApp with our
            comprehensive documentation
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <CodeBlock code={installCode} language="bash" />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
            <CodeBlock code={usageCode} language="typescript" />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                variant="outline"
                className="h-auto p-6 text-left space-y-2"
              >
                <h3 className="text-lg font-medium">API Reference</h3>
                <p className="text-sm text-muted-foreground">
                  Explore the complete API documentation
                </p>
                <ArrowRight className="h-4 w-4 mt-2" />
              </Button>
              <Button
                variant="outline"
                className="h-auto p-6 text-left space-y-2"
              >
                <h3 className="text-lg font-medium">Examples</h3>
                <p className="text-sm text-muted-foreground">
                  View example implementations and use cases
                </p>
                <ArrowRight className="h-4 w-4 mt-2" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
