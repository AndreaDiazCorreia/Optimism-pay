import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Coins } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Cross-chain Transactions,
              <br />
              Simplified
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Integrate seamless cross-chain transactions into your dApp with
              our powerful SDK
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hover-gradient">
                Try Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-radial from-red-500/20 to-transparent blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose <span className="gradient-text">OptimismPay</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Execute cross-chain transactions with minimal latency and maximum efficiency",
              },
              {
                icon: Shield,
                title: "Secure by Design",
                description:
                  "Built with security-first principles and thoroughly audited protocols",
              },
              {
                icon: Coins,
                title: "Cost Effective",
                description:
                  "Optimize transaction costs with intelligent routing and batching",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background border hover:border-primary/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of cross-chain transactions today
          </p>
          <Link href="/demo">
            <Button size="lg" className="hover-gradient">
              Launch Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
