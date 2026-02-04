"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Binary,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Code,
  Cpu,
  Eye,
  EyeOff,
  Layers,
  ArrowRight,
  Info,
  Lightbulb,
  GraduationCap,
  FileCode,
  Zap,
  Hash,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "overview", label: "Visão Geral", icon: BookOpen },
  { id: "lsb", label: "Método LSB", icon: Binary },
  { id: "aes", label: "Encriptação AES", icon: Shield },
  { id: "security", label: "Segurança", icon: Lock },
  { id: "implementation", label: "Implementação", icon: Code },
  { id: "faq", label: "FAQ", icon: Lightbulb },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="border-b border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Documentação Técnica
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Aprenda sobre os conceitos fundamentais de esteganografia e
              criptografia utilizados nesta aplicação. Esta documentação foi
              preparada para fins educacionais e académicos.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
                    Conteúdo
                  </p>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 max-w-3xl space-y-12">
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Visão Geral
                    </h2>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      A <strong className="text-foreground">esteganografia</strong> 
                      é a arte e ciência de ocultar informação dentro de outros
                      dados de forma imperceptível. Diferente da criptografia,
                      que torna a mensagem ilegível, a esteganografia esconde a
                      própria existência da mensagem.
                    </p>

                    <Card className="my-6">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Esteganografia vs Criptografia
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-2 mb-2">
                              <EyeOff className="h-4 w-4 text-primary" />
                              <span className="font-medium text-foreground">
                                Esteganografia
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Oculta a existência da mensagem. O observador não
                              sabe que há informação escondida.
                            </p>
                          </div>
                          <div className="p-4 rounded-lg bg-secondary/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Lock className="h-4 w-4 text-primary" />
                              <span className="font-medium text-foreground">
                                Criptografia
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Torna a mensagem ilegível. O observador sabe que
                              há uma mensagem, mas não consegue lê-la.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <p className="text-muted-foreground leading-relaxed">
                      Esta aplicação combina <strong className="text-foreground">ambas as técnicas</strong>: 
                      primeiro encripta a mensagem com AES-256, depois oculta os
                      dados encriptados numa imagem usando LSB. Isto fornece
                      dupla proteção - mesmo que alguém suspeite da existência
                      de dados ocultos, não conseguirá lê-los sem a chave.
                    </p>

                    <div className="my-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Workflow className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-2">
                            Fluxo do Processo
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span className="px-2 py-1 rounded bg-secondary">
                              Mensagem
                            </span>
                            <ArrowRight className="h-4 w-4" />
                            <span className="px-2 py-1 rounded bg-secondary">
                              AES-256
                            </span>
                            <ArrowRight className="h-4 w-4" />
                            <span className="px-2 py-1 rounded bg-secondary">
                              Dados Cifrados
                            </span>
                            <ArrowRight className="h-4 w-4" />
                            <span className="px-2 py-1 rounded bg-secondary">
                              LSB
                            </span>
                            <ArrowRight className="h-4 w-4" />
                            <span className="px-2 py-1 rounded bg-primary/20 text-primary">
                              Imagem Final
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* LSB Section */}
                <section id="lsb" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Binary className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Método LSB (Least Significant Bit)
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O método <strong className="text-foreground">LSB</strong>{" "}
                      é uma das técnicas mais populares de esteganografia em
                      imagens. Funciona modificando o bit menos significativo de
                      cada canal de cor dos pixels.
                    </p>

                    {/* How pixels work */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" />
                          Como funcionam os Pixels
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Cada pixel numa imagem RGB é composto por 3 canais:
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                            <span className="text-red-400 font-mono font-bold">
                              R
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Vermelho
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0-255
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                            <span className="text-green-400 font-mono font-bold">
                              G
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Verde
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0-255
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                            <span className="text-blue-400 font-mono font-bold">
                              B
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              Azul
                            </p>
                            <p className="text-xs text-muted-foreground">
                              0-255
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Cada canal é representado por 8 bits (1 byte). O bit
                          menos significativo (LSB) é o último bit, que
                          contribui apenas com o valor 1 para o total.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Binary example */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Hash className="h-4 w-4 text-primary" />
                          Exemplo Prático
                        </CardTitle>
                        <CardDescription>
                          Modificação do LSB de um valor de pixel
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                            <p className="text-muted-foreground mb-2">
                              Valor original do canal R: 156
                            </p>
                            <p className="text-foreground">
                              Binário: 1001110
                              <span className="text-primary font-bold">0</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              LSB = 0 (destacado)
                            </p>
                          </div>

                          <div className="flex items-center justify-center">
                            <ArrowRight className="h-5 w-5 text-primary rotate-90" />
                          </div>

                          <div className="p-4 rounded-lg bg-primary/10 font-mono text-sm">
                            <p className="text-muted-foreground mb-2">
                              Após inserir bit 1:
                            </p>
                            <p className="text-foreground">
                              Binário: 1001110
                              <span className="text-primary font-bold">1</span>
                            </p>
                            <p className="text-foreground mt-2">
                              Novo valor: 157 (diferença: +1)
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border">
                          <p className="text-xs text-muted-foreground">
                            <Info className="inline h-3 w-3 mr-1" />A diferença
                            de 1 unidade num canal de 256 níveis é{" "}
                            <strong className="text-foreground">
                              imperceptível
                            </strong>{" "}
                            ao olho humano.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Capacity */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-primary" />
                          Capacidade de Armazenamento
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Usando 1 bit por canal RGB, a capacidade é:
                        </p>
                        <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
                          <p className="text-muted-foreground">
                            Capacidade = (Largura x Altura x 3 canais x 1 bit) /
                            8
                          </p>
                          <p className="text-foreground mt-2">
                            Exemplo: Imagem 1920x1080
                          </p>
                          <p className="text-primary">
                            = (1920 x 1080 x 3) / 8 = 777.600 bytes = 759 KB
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pros and Cons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Vantagens
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              Simples de implementar
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              Alta capacidade de armazenamento
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              Baixa distorção visual
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              Rápido processamento
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2 text-red-400">
                            <XCircle className="h-4 w-4" />
                            Desvantagens
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                              Vulnerável a ataques estatísticos
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                              Dados perdidos com compressão JPEG
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                              Não resiste a recortes ou edições
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                              Detectável por steganalysis
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

                {/* AES Section */}
                <section id="aes" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Encriptação AES-256
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O <strong className="text-foreground">AES</strong>{" "}
                      (Advanced Encryption Standard) é o padrão de encriptação
                      simétrica mais utilizado no mundo. Foi adotado pelo
                      governo dos EUA e é considerado seguro para proteger
                      informação classificada.
                    </p>

                    {/* AES Overview */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Características do AES-256
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Tamanho da Chave
                              </p>
                              <p className="font-medium text-foreground">
                                256 bits
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Tamanho do Bloco
                              </p>
                              <p className="font-medium text-foreground">
                                128 bits
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Número de Rondas
                              </p>
                              <p className="font-medium text-foreground">
                                14 rondas
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Modo de Operação
                              </p>
                              <p className="font-medium text-foreground">
                                GCM (autenticado)
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* GCM Mode */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          Modo GCM (Galois/Counter Mode)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          O modo GCM combina encriptação com autenticação,
                          fornecendo:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-foreground">
                                Confidencialidade
                              </strong>
                              : Os dados são encriptados e ilegíveis sem a chave
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-foreground">
                                Integridade
                              </strong>
                              : Qualquer modificação nos dados é detectada
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-foreground">
                                Autenticação
                              </strong>
                              : Garante que os dados vêm da fonte esperada
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Key Derivation */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Key className="h-4 w-4 text-primary" />
                          Derivação de Chave (PBKDF2)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          A password do utilizador não é usada diretamente.
                          Primeiro é derivada uma chave criptográfica usando
                          PBKDF2:
                        </p>
                        <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs space-y-2">
                          <p className="text-muted-foreground">
                            // Processo de derivação
                          </p>
                          <p className="text-foreground">
                            Salt: 16 bytes aleatórios
                          </p>
                          <p className="text-foreground">
                            Iterações: 100.000
                          </p>
                          <p className="text-foreground">Hash: SHA-256</p>
                          <p className="text-primary">
                            Resultado: Chave AES de 256 bits
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-xs text-muted-foreground">
                            <Info className="inline h-3 w-3 mr-1 text-primary" />
                            As 100.000 iterações tornam ataques de força bruta
                            extremamente lentos e impraticáveis.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security Level */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Nível de Segurança
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 rounded-lg bg-secondary/50">
                          <p className="text-sm text-muted-foreground mb-3">
                            Número de combinações possíveis com AES-256:
                          </p>
                          <p className="font-mono text-lg text-primary">
                            2^256 = 1.15 x 10^77 combinações
                          </p>
                          <p className="text-xs text-muted-foreground mt-3">
                            Isto é mais que o número estimado de átomos no
                            universo observável (~10^80). Um ataque de força
                            bruta levaria mais tempo do que a idade do universo.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Security Section */}
                <section id="security" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Considerações de Segurança
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Threat Model */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                          Modelo de Ameaças
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="h-4 w-4 text-green-400" />
                              <span className="font-medium text-foreground">
                                Protegido contra
                              </span>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>- Observadores casuais</li>
                              <li>- Ataques de força bruta à encriptação</li>
                              <li>- Intercepção de mensagens em trânsito</li>
                              <li>- Análise visual da imagem</li>
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                              <span className="font-medium text-foreground">
                                Vulnerabilidades conhecidas
                              </span>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>- Análise estatística (steganalysis)</li>
                              <li>- Compressão JPEG (destrói dados)</li>
                              <li>
                                - Engenharia social (obter a password)
                              </li>
                              <li>- Acesso físico ao dispositivo</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Best Practices */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Boas Práticas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {[
                            "Use sempre passwords fortes e únicas (mínimo 12 caracteres)",
                            "Nunca partilhe a password pelo mesmo canal da imagem",
                            "Use sempre o formato PNG para preservar os dados",
                            "Elimine os ficheiros originais após uso",
                            "Evite usar imagens muito conhecidas como cobertura",
                            "Não reutilize a mesma imagem de cobertura",
                          ].map((practice, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Steganalysis */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4 text-primary" />
                          Steganalysis (Deteção)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Steganalysis refere-se às técnicas usadas para detetar
                          a presença de dados ocultos. O método LSB é vulnerável
                          a:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                            <span>
                              <strong className="text-foreground">
                                Análise Chi-quadrado
                              </strong>
                              : Deteta desvios estatísticos nos valores dos
                              pixels
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                            <span>
                              <strong className="text-foreground">
                                RS Analysis
                              </strong>
                              : Analisa pares de pixels para detetar
                              modificações
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                            <span>
                              <strong className="text-foreground">
                                Análise de histograma
                              </strong>
                              : Compara distribuições de valores antes e depois
                            </span>
                          </li>
                        </ul>
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-xs text-muted-foreground">
                            <Lightbulb className="inline h-3 w-3 mr-1 text-primary" />
                            Mesmo que a presença de dados seja detetada, a
                            encriptação AES-256 mantém o conteúdo protegido.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Implementation Section */}
                <section id="implementation" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Implementação Técnica
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Tabs defaultValue="encode" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="encode">Codificação</TabsTrigger>
                        <TabsTrigger value="decode">Descodificação</TabsTrigger>
                        <TabsTrigger value="crypto">Criptografia</TabsTrigger>
                      </TabsList>

                      <TabsContent value="encode" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Algoritmo de Codificação LSB
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                              <pre className="text-muted-foreground">
                                {`function encodeMessage(imageData, message):
  bits = stringToBits(message)
  header = numberToBits(bits.length, 32)
  allBits = header + bits
  
  for i = 0 to imageData.length:
    if i % 4 == 3:  // Skip alpha channel
      continue
    
    // Clear LSB and set new bit
    imageData[i] = (imageData[i] & 0xFE) | allBits[bitIndex]
    bitIndex++
    
    if bitIndex >= allBits.length:
      break
  
  return imageData`}
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="decode" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Algoritmo de Descodificação LSB
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                              <pre className="text-muted-foreground">
                                {`function decodeMessage(imageData):
  extractedBits = []
  
  // Extract header (32 bits for length)
  for i = 0 to 32:
    extractedBits.push(imageData[i] & 1)
  
  messageLength = bitsToNumber(extractedBits)
  
  // Extract message bits
  for i = 32 to messageLength:
    if i % 4 == 3:
      continue
    extractedBits.push(imageData[i] & 1)
  
  return bitsToString(extractedBits)`}
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="crypto" className="mt-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Encriptação AES-256-GCM
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                              <pre className="text-muted-foreground">
                                {`async function encrypt(message, password):
  salt = generateRandomBytes(16)
  iv = generateRandomBytes(12)
  
  // Derive key using PBKDF2
  key = await deriveKey(password, salt, {
    iterations: 100000,
    hash: 'SHA-256',
    keyLength: 256
  })
  
  // Encrypt with AES-GCM
  ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encode(message)
  )
  
  return { ciphertext, salt, iv }`}
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>

                    {/* Technologies Used */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-primary" />
                          Tecnologias Utilizadas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { name: "Web Crypto API", desc: "Encriptação" },
                            { name: "Canvas API", desc: "Manipulação de imagens" },
                            { name: "TypeScript", desc: "Linguagem" },
                            { name: "Next.js", desc: "Framework" },
                          ].map((tech, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-lg bg-secondary/50 text-center"
                            >
                              <p className="font-medium text-foreground text-sm">
                                {tech.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {tech.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Perguntas Frequentes
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        A imagem fica visivelmente diferente após a codificação?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Não. As alterações feitas pelo método LSB são
                        imperceptíveis ao olho humano. Cada pixel é modificado
                        no máximo em 1 unidade por canal de cor, o que
                        representa uma diferença inferior a 0.4% que é
                        impossível de distinguir visualmente.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Posso enviar a imagem por WhatsApp ou redes sociais?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Não é recomendado. A maioria das plataformas recomprime
                        as imagens, o que destrói os dados ocultos. Use sempre
                        métodos de transferência que preservem o ficheiro
                        original, como email com anexo, serviços de cloud
                        (Google Drive, Dropbox), ou transferência direta de
                        ficheiros.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Porque é que devo usar PNG em vez de JPEG?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        O formato PNG usa compressão sem perdas, preservando
                        todos os dados dos pixels. O JPEG usa compressão com
                        perdas que modifica os valores dos pixels,
                        corrompendo os dados ocultos. Mesmo converter de PNG
                        para JPEG e de volta para PNG irá destruir a mensagem.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Os meus dados são enviados para algum servidor?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Não. Todo o processamento é realizado localmente no seu
                        navegador usando a Web Crypto API e Canvas API. A
                        imagem, a mensagem e a password nunca saem do seu
                        dispositivo. Pode até usar a aplicação offline após o
                        carregamento inicial.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>
                        O que acontece se eu perder a password?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Infelizmente, a mensagem será irrecuperável. A
                        encriptação AES-256 é matematicamente impossível de
                        quebrar sem a password correta. Não existe uma "porta
                        traseira" ou método de recuperação. Guarde sempre a
                        password em local seguro.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>
                        Quantos dados posso ocultar numa imagem?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        A capacidade depende do tamanho da imagem. Com o método
                        LSB usando 1 bit por canal RGB, pode armazenar
                        aproximadamente (largura x altura x 3) / 8 bytes. Por
                        exemplo, uma imagem Full HD (1920x1080) pode armazenar
                        cerca de 759 KB de dados.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                      <AccordionTrigger>
                        Esta técnica é legal de usar?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim, a esteganografia e criptografia são legais na
                        maioria dos países para uso pessoal legítimo. No
                        entanto, como qualquer ferramenta, não deve ser usada
                        para fins ilegais. A responsabilidade pelo uso correto
                        é do utilizador.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
