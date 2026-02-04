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
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Binary,
  Key,
  ArrowRight,
  CheckCircle2,
  Zap,
  Server,
  FileImage,
  BookOpen,
  Github,
  Code,
  Cpu,
  Layers,
  ShieldCheck,
  Download,
  Upload,
  Sparkles,
  GraduationCap,
  Award,
  Users,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Encriptação AES-256",
    description:
      "Utiliza o padrão de encriptação mais seguro do mundo, aprovado pelo governo dos EUA para informação classificada.",
  },
  {
    icon: Binary,
    title: "Método LSB",
    description:
      "Implementação do algoritmo Least Significant Bit para ocultar dados de forma imperceptível nos pixels da imagem.",
  },
  {
    icon: Zap,
    title: "Processamento Local",
    description:
      "Todo o processamento acontece no seu navegador. Nenhum dado é enviado para servidores externos.",
  },
  {
    icon: Key,
    title: "PBKDF2 Key Derivation",
    description:
      "100.000 iterações de derivação de chave tornam ataques de força bruta matematicamente impraticáveis.",
  },
  {
    icon: FileImage,
    title: "Suporte Multi-formato",
    description:
      "Compatível com PNG, JPEG, BMP e WebP. Recomendamos PNG para preservar a integridade dos dados.",
  },
  {
    icon: Eye,
    title: "Zero Alteração Visual",
    description:
      "As modificações são completamente imperceptíveis ao olho humano, mantendo a imagem original intacta.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Carregar Imagem",
    description: "Selecione a imagem que servirá de cobertura para a sua mensagem secreta.",
    icon: Upload,
  },
  {
    step: 2,
    title: "Escrever Mensagem",
    description: "Introduza o texto que deseja ocultar de forma segura na imagem.",
    icon: Lock,
  },
  {
    step: 3,
    title: "Definir Password",
    description: "Crie uma chave de encriptação forte para proteger a sua mensagem.",
    icon: Key,
  },
  {
    step: 4,
    title: "Descarregar",
    description: "Guarde a imagem processada com a mensagem encriptada e oculta.",
    icon: Download,
  },
];

const techStack = [
  { name: "Next.js 15", category: "Framework" },
  { name: "TypeScript", category: "Linguagem" },
  { name: "Web Crypto API", category: "Criptografia" },
  { name: "Canvas API", category: "Imagens" },
  { name: "Tailwind CSS", category: "Estilos" },
  { name: "React 19", category: "UI Library" },
];

const stats = [
  { value: "256", label: "Bits de Encriptação", icon: Shield },
  { value: "100K", label: "Iterações PBKDF2", icon: Cpu },
  { value: "100%", label: "Processamento Local", icon: Server },
  { value: "0", label: "Dados Enviados", icon: Zap },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-20" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Projeto Académico de Segurança Informática
                </span>
              </div>

              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                        BitShadow
                      </h1>
                      <span className="px-2 py-1 text-xs font-bold bg-primary/20 text-primary rounded uppercase">
                        Lite
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                      Steganography + Cryptography
                    </p>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight text-balance">
                Oculte mensagens encriptadas em imagens de forma{" "}
                <span className="text-primary">invisível</span> e{" "}
                <span className="text-primary">segura</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
                Aplicação profissional de esteganografia que combina o método
                LSB (Least Significant Bit) com encriptação AES-256 para
                proteger as suas comunicações secretas.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/encode">
                  <Button size="lg" className="text-base px-8 group">
                    <Lock className="mr-2 h-5 w-5" />
                    Codificar Mensagem
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/decode">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 bg-transparent"
                  >
                    <Unlock className="mr-2 h-5 w-5" />
                    Descodificar Mensagem
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: ShieldCheck, text: "100% Seguro" },
                  { icon: Server, text: "Zero Servidores" },
                  { icon: Code, text: "Open Source" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Como Funciona
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Um processo simples de 4 passos para ocultar mensagens
                encriptadas em qualquer imagem
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative">
                    {/* Connector line */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
                    )}

                    <div className="relative bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all group">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link href="/encode">
                <Button size="lg">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Experimentar Agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-32 bg-card/30 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Características Técnicas
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tecnologia de ponta combinando esteganografia e criptografia
                para máxima segurança
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={i}
                    className="bg-card hover:border-primary/50 transition-all group"
                  >
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Segurança de Nível Empresarial
                </h2>
                <p className="text-muted-foreground mb-8">
                  A combinação de esteganografia com criptografia forte fornece
                  duas camadas de proteção: primeiro, a mensagem é encriptada
                  com AES-256; depois, os dados encriptados são ocultados na
                  imagem de forma invisível.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Encriptação Autenticada",
                      desc: "AES-256-GCM garante confidencialidade e integridade",
                    },
                    {
                      title: "Derivação Segura",
                      desc: "PBKDF2 com 100.000 iterações protege contra brute-force",
                    },
                    {
                      title: "Aleatoriedade Criptográfica",
                      desc: "Salt e IV únicos para cada mensagem",
                    },
                    {
                      title: "Processamento Client-Side",
                      desc: "Zero confiança em servidores externos",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/documentation">
                    <Button variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Ver Documentação Completa
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
                <Card className="relative">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      Exemplo de Codificação LSB
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground">
                        {`// Pixel Original
R: 156 = 10011100
G: 203 = 11001011
B: 89  = 01011001

// Bits da Mensagem: 101

// Pixel Modificado
R: 157 = 10011101  // +1
G: 203 = 11001011  // sem alteração
B: 89  = 01011001  // sem alteração

// Diferença visual: imperceptível`}
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Cada pixel pode armazenar 3 bits de informação (1 por canal
                      RGB) com alteração máxima de 1 unidade por canal.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-32 bg-card/30 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stack Tecnológico
              </h2>
              <p className="text-muted-foreground">
                Construído com tecnologias modernas e seguras
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all text-center group"
                >
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tech.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Section */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-primary font-medium uppercase tracking-wider">
                          Projeto Académico
                        </p>
                        <h3 className="text-2xl font-bold text-foreground">
                          Segurança Informática
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Este projeto foi desenvolvido como trabalho final para a
                      disciplina de Segurança Informática, demonstrando a
                      implementação prática de conceitos de esteganografia e
                      criptografia.
                    </p>
                    <div className="p-4 rounded-lg bg-background/50 mb-6">
                      <p className="text-sm font-medium text-foreground">Desenvolvido por:</p>
                      <p className="text-primary font-semibold">Tomás Gaspar - 2024164</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ISTEC - Instituto Superior de Tecnologias Avançadas
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-background/50">
                        <Award className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          Projeto Final
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          Trabalho Individual
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          2024/2025
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Objetivos de Aprendizagem:
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Compreender os fundamentos da esteganografia",
                        "Implementar encriptação simétrica AES-256",
                        "Aplicar boas práticas de segurança",
                        "Desenvolver interfaces de utilizador intuitivas",
                        "Documentar processos técnicos",
                      ].map((obj, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-card/30 border-t border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Experimente a ferramenta de esteganografia mais completa e segura.
              Todo o processamento é local - os seus dados nunca saem do seu
              dispositivo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/encode">
                <Button size="lg" className="text-base px-8">
                  <Lock className="mr-2 h-5 w-5" />
                  Começar a Codificar
                </Button>
              </Link>
              <Link href="/documentation">
                <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ler Documentação
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
