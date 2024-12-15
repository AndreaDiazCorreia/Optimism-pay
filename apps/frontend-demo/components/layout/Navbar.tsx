"use client";
import Image from "next/image";
import "@/app/globals.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, ArrowRightLeft, Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_WALLET = {
  address: "0x1234...5678",
  balance: "1,234.56 OP",
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Wallet },
    { href: "/demo", label: "Demo", icon: ArrowRightLeft },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed w-full h-16 bg-zinc-900 border-b border-zinc-800 px-6 items-center justify-between z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_full.png" // Ruta del logo completo
              alt="Optimism Pay Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors",
                  pathname === href && "bg-zinc-800",
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <span className="font-mono">{MOCK_WALLET.address}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex justify-between">
                  <span className="text-sm text-zinc-400">Balance</span>
                  <span>{MOCK_WALLET.balance}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-[#ff0420] hover:bg-[#cc0319]"
              onClick={() => setIsConnected(true)}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        <nav
          className={cn(
            "fixed top-0 left-0 w-[280px] h-screen bg-zinc-900 border-r border-zinc-800 p-4 transition-transform z-50",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_small.png" // Ruta del logo pequeño
                alt="Optimism Pay Logo"
                width={40}
                height={40}
                priority
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors",
                  pathname === href && "bg-zinc-800",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            {isConnected ? (
              <div className="p-4 bg-zinc-800 rounded-lg space-y-2">
                <div className="text-sm text-zinc-400">Connected Wallet</div>
                <div className="font-mono">{MOCK_WALLET.address}</div>
                <div className="text-sm text-zinc-400">
                  {MOCK_WALLET.balance}
                </div>
              </div>
            ) : (
              <Button
                className="w-full bg-[#ff0420] hover:bg-[#cc0319]"
                onClick={() => setIsConnected(true)}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
