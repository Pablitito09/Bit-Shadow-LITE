"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Lock,
  Unlock,
  BookOpen,
  Home,
  Menu,
  X,
  Shield,
  Download,
  Crown,
  Sparkles,
  Github,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/encode", label: "Codificar", icon: Lock },
  { href: "/decode", label: "Descodificar", icon: Unlock },
  { href: "/documentation", label: "Documentação", icon: BookOpen },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground tracking-tight">
                  BitShadow
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary/20 text-primary rounded uppercase">
                  Lite
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Steganography
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.dropbox.com/scl/fi/d04wpfr8p3pgniz5s2fs6/mysetup.exe?rlkey=06ouoo1mo5t56xdd95w39l9j9&st=uuggk6a2&dl=1"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 transition-all group"
            >
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Baixar Versão PRO</span>
              <Download className="h-4 w-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border space-y-2">
              <Link href="/encode" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Começar Agora</Button>
              </Link>
              <a
                href="https://www.dropbox.com/scl/fi/d04wpfr8p3pgniz5s2fs6/mysetup.exe?rlkey=06ouoo1mo5t56xdd95w39l9j9&st=uuggk6a2&dl=1"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30"
              >
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Baixar Versão PRO</span>
                <Download className="h-4 w-4 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
