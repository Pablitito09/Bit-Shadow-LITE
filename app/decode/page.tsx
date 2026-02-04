"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Unlock,
  Lock,
  Shield,
  Binary,
  Zap,
  Crown,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Monitor,
} from "lucide-react";

const proFeatures = [
  {
    title: "Descodificação Ilimitada",
    description: "Descodifique qualquer número de mensagens sem restrições",
  },
  {
    title: "Mensagens Ilimitadas",
    description: "Sem limite de caracteres na codificação de mensagens",
  },
  {
    title: "Modo Offline",
    description: "Funciona completamente offline após instalação",
  },
  {
    title: "Processamento Local",
    description: "Todos os dados permanecem no seu computador",
  },
  {
    title: "Atualizações Gratuitas",
    description: "Receba todas as futuras atualizações sem custos adicionais",
  },
  {
    title: "Sem Publicidade",
    description: "Interface limpa e focada na sua produtividade",
  },
];

export default function DecodePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="border-b border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Unlock className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Descodificar Mensagem
                  </h1>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Extraia e desencripte mensagens ocultas em imagens
                  esteganográficas. Necessita da imagem original e da chave de
                  encriptação utilizada.
                </p>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    AES-256
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
                  <Binary className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    LSB
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
                  <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Local
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locked Content */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Lock Card */}
            <Card className="border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  {/* Lock Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 mb-6">
                    <Lock className="h-10 w-10 text-amber-400" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Funcionalidade Exclusiva da Versão PRO
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    A descodificação de mensagens está disponível apenas na versão PRO (Desktop) do BitShadow.
                    Faça download gratuito e desbloqueie todas as funcionalidades.
                  </p>

                  {/* Lite vs Pro Comparison */}
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* Lite */}
                    <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="px-2 py-1 text-xs font-bold bg-muted text-muted-foreground rounded">
                          LITE
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          Versão Web
                        </span>
                      </div>
                      <ul className="space-y-3 text-left">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Codificar mensagens</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-muted-foreground">Limite de 500 caracteres</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Lock className="h-4 w-4 text-destructive" />
                          <span className="text-muted-foreground line-through">Descodificar mensagens</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pro */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-amber-950 text-xs font-bold">
                        RECOMENDADO
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Crown className="h-5 w-5 text-amber-400" />
                        <span className="text-lg font-semibold text-foreground">
                          Versão PRO
                        </span>
                      </div>
                      <ul className="space-y-3 text-left">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-amber-400" />
                          <span className="text-foreground">Codificar mensagens</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-amber-400" />
                          <span className="text-foreground">Mensagens ilimitadas</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-amber-400" />
                          <span className="text-foreground font-medium">Descodificar mensagens</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Download Button */}
                  <a
                    href="https://www.dropbox.com/scl/fi/d04wpfr8p3pgniz5s2fs6/mysetup.exe?rlkey=06ouoo1mo5t56xdd95w39l9j9&st=uuggk6a2&dl=1"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all text-amber-950 font-semibold text-lg group"
                  >
                    <Monitor className="h-6 w-6" />
                    Baixar BitShadow PRO para Windows
                    <Download className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-3">
                    Download gratuito | Windows 10/11 | ~50MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pro Features Grid */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground text-center mb-8">
                Funcionalidades da Versão PRO
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {proFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-card border border-border hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Action */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Ainda não tem uma imagem com mensagem oculta?
              </p>
              <Link href="/encode">
                <Button variant="outline" size="lg" className="bg-transparent">
                  <Lock className="mr-2 h-5 w-5" />
                  Criar Mensagem Oculta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
