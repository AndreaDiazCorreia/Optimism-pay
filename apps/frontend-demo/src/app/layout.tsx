import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OptimismPay - Cross-chain Transactions Made Simple",
  description:
    "Seamlessly integrate cross-chain transactions into your dApp with OptimismPay SDK",
  openGraph: {
    title: "OptimismPay - Cross-chain Transactions Made Simple",
    description:
      "Seamlessly integrate cross-chain transactions into your dApp with OptimismPay SDK",
    type: "website",
    url: "https://optimismpay.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
