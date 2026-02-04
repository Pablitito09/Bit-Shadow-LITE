"use client";

import { useState, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ImageDropzone } from "@/components/image-dropzone";
import { PasswordInput } from "@/components/password-input";
import { ImageAnalysisDisplay } from "@/components/image-analysis";
import { ProcessStepper, type Step } from "@/components/process-stepper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ImageIcon,
  MessageSquare,
  Key,
  Download,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
  FileDown,
  RotateCcw,
  Shield,
  Eye,
  EyeOff,
  Copy,
  Sparkles,
  Binary,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  encodeMessage,
  imageDataToBlob,
  createDownloadUrl,
  canFitMessage,
  type ImageAnalysis,
  type EncodeStats,
} from "@/lib/steganography";
import {
  encryptMessage,
  packEncryptedData,
  calculatePasswordStrength,
} from "@/lib/crypto";

const STEPS: Step[] = [
  {
    id: "image",
    title: "Selecionar Imagem",
    description: "Carregar a imagem de cobertura",
    icon: ImageIcon,
  },
  {
    id: "message",
    title: "Escrever Mensagem",
    description: "Introduzir o texto a ocultar",
    icon: MessageSquare,
  },
  {
    id: "encrypt",
    title: "Encriptar",
    description: "Definir chave de encriptação",
    icon: Key,
  },
  {
    id: "download",
    title: "Transferir",
    description: "Guardar imagem processada",
    icon: Download,
  },
];

interface ImageData {
  file: File;
  imageData: ImageData;
  width: number;
  height: number;
  preview: string;
  analysis: ImageAnalysis;
}

export default function EncodePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageState, setImageState] = useState<{
    file: File;
    imageData: globalThis.ImageData;
    width: number;
    height: number;
    preview: string;
    analysis: ImageAnalysis;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    downloadUrl?: string;
    stats?: EncodeStats;
    error?: string;
  } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageLoad = useCallback(
    (data: {
      file: File;
      imageData: globalThis.ImageData;
      width: number;
      height: number;
      preview: string;
      analysis: ImageAnalysis;
    }) => {
      setImageState(data);
      setResult(null);
    },
    []
  );

  const handleClearImage = useCallback(() => {
    if (imageState?.preview) {
      URL.revokeObjectURL(imageState.preview);
    }
    setImageState(null);
    setResult(null);
  }, [imageState]);

  const handleProcess = async () => {
    if (!imageState || !message || !password) return;

    setIsProcessing(true);
    setResult(null);

    try {
      // 1. Encriptar a mensagem com AES-256
      const encrypted = await encryptMessage(message, password);
      const packedData = packEncryptedData(encrypted);

      // 2. Verificar se cabe na imagem
      const fitCheck = canFitMessage(
        packedData.length,
        imageState.width,
        imageState.height
      );

      if (!fitCheck.canFit) {
        throw new Error(
          `Mensagem demasiado grande. Necessário: ${fitCheck.required} bytes, Disponível: ${fitCheck.available} bytes`
        );
      }

      // 3. Codificar na imagem usando LSB
      const encodeResult = encodeMessage(imageState.imageData, packedData);

      if (!encodeResult.success) {
        throw new Error(encodeResult.error || "Erro ao codificar mensagem");
      }

      // 4. Converter para blob e criar URL de download
      const blob = await imageDataToBlob(encodeResult.imageData);
      const downloadUrl = createDownloadUrl(blob);

      setResult({
        success: true,
        downloadUrl,
        stats: encodeResult.stats,
      });

      setCurrentStep(3);
    } catch (error) {
      setResult({
        success: false,
        error:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result?.downloadUrl) return;

    const a = document.createElement("a");
    a.href = result.downloadUrl;
    a.download = `bitshadow_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (imageState?.preview) {
      URL.revokeObjectURL(imageState.preview);
    }
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setImageState(null);
    setMessage("");
    setPassword("");
    setResult(null);
    setCurrentStep(0);
  };

  // Limite de caracteres para a versão Lite
  const MESSAGE_CHAR_LIMIT = 100;
  const isOverLimit = message.length > MESSAGE_CHAR_LIMIT;

  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!imageState;
      case 2:
        return !!imageState && message.length > 0 && !isOverLimit;
      case 3:
        return (
          !!imageState &&
          message.length > 0 &&
          !isOverLimit &&
          password.length >= 6
        );
      default:
        return true;
    }
  };

  const passwordStrength = calculatePasswordStrength(password);
  const messageByteLength = new TextEncoder().encode(message).length;
  const fitInfo = imageState
    ? canFitMessage(messageByteLength * 3, imageState.width, imageState.height)
    : null;

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
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Codificar Mensagem
                  </h1>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Oculte mensagens encriptadas em imagens usando esteganografia
                  LSB e encriptação AES-256. O processo é completamente seguro e
                  executado localmente no seu navegador.
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

            {/* Stepper */}
            <div className="mt-8">
              <ProcessStepper steps={STEPS} currentStep={currentStep} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Image Selection */}
                <Card
                  className={cn(
                    "transition-all",
                    currentStep === 0 && "ring-2 ring-primary/50"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                            currentStep >= 0
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {currentStep > 0 ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            "1"
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Selecionar Imagem de Cobertura
                          </CardTitle>
                          <CardDescription>
                            A imagem que irá conter a mensagem oculta
                          </CardDescription>
                        </div>
                      </div>
                      {imageState && currentStep !== 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(0)}
                        >
                          Editar
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ImageDropzone
                      onImageLoad={handleImageLoad}
                      currentImage={imageState?.preview}
                      onClear={handleClearImage}
                      disabled={currentStep !== 0}
                    />

                    {imageState && currentStep === 0 && (
                      <div className="mt-4 flex justify-end">
                        <Button onClick={() => setCurrentStep(1)}>
                          Continuar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Step 2: Message Input */}
                <Card
                  className={cn(
                    "transition-all",
                    currentStep === 1 && "ring-2 ring-primary/50",
                    currentStep < 1 && "opacity-60"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                            currentStep >= 1
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {currentStep > 1 ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            "2"
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Escrever Mensagem Secreta
                          </CardTitle>
                          <CardDescription>
                            O texto que será encriptado e ocultado
                          </CardDescription>
                        </div>
                      </div>
                      {message && currentStep !== 1 && currentStep > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                        >
                          Editar
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-foreground">
                            Mensagem
                          </label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => setShowPreview(!showPreview)}
                            >
                              {showPreview ? (
                                <EyeOff className="h-3 w-3 mr-1" />
                              ) : (
                                <Eye className="h-3 w-3 mr-1" />
                              )}
                              {showPreview ? "Ocultar" : "Pré-visualizar"}
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Escreva aqui a sua mensagem secreta..."
                          className={cn(
                            "min-h-32 font-mono text-sm resize-y",
                            showPreview && "blur-sm select-none"
                          )}
                          disabled={currentStep < 1}
                        />
                      </div>

                      {/* Message Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className={cn(isOverLimit && "text-destructive")}>
                          <strong className={cn("text-foreground", isOverLimit && "text-destructive")}>
                            {message.length}
                          </strong>
                          /{MESSAGE_CHAR_LIMIT} caracteres
                        </span>
                        <span>
                          <strong className="text-foreground">
                            {messageByteLength}
                          </strong>{" "}
                          bytes
                        </span>
                        {fitInfo && !isOverLimit && (
                          <span
                            className={cn(
                              fitInfo.canFit
                                ? "text-primary"
                                : "text-destructive"
                            )}
                          >
                            {fitInfo.canFit ? (
                              <>
                                <CheckCircle2 className="inline h-3 w-3 mr-1" />
                                Cabe na imagem ({fitInfo.percentage.toFixed(1)}%
                                usado)
                              </>
                            ) : (
                              <>
                                <AlertCircle className="inline h-3 w-3 mr-1" />
                                Mensagem demasiado grande
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      {/* Lite Version Limit Warning */}
                      {isOverLimit && (
                        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="space-y-2">
                              <p className="text-amber-400 font-medium text-sm">
                                Limite de caracteres atingido (Versão Lite)
                              </p>
                              <p className="text-xs text-muted-foreground">
                                A versão Lite está limitada a {MESSAGE_CHAR_LIMIT} caracteres por mensagem.
                                Para mensagens ilimitadas, faça download da{" "}
                                <a href="#" className="text-amber-400 underline hover:text-amber-300">
                                  Versão PRO (Desktop)
                                </a>.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 1 && (
                        <div className="flex items-center justify-between pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep(0)}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                          </Button>
                          <Button
                            onClick={() => setCurrentStep(2)}
                            disabled={!canProceedToStep(2)}
                          >
                            Continuar
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3: Encryption */}
                <Card
                  className={cn(
                    "transition-all",
                    currentStep === 2 && "ring-2 ring-primary/50",
                    currentStep < 2 && "opacity-60"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                            currentStep >= 2
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {currentStep > 2 ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            "3"
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Chave de Encriptação AES-256
                          </CardTitle>
                          <CardDescription>
                            Password para encriptar a mensagem
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <PasswordInput
                        value={password}
                        onChange={setPassword}
                        showStrength={currentStep >= 2}
                        description="Esta chave será necessária para desencriptar a mensagem. Guarde-a em segurança!"
                      />

                      {/* Encryption Info */}
                      <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="space-y-2 text-sm">
                            <p className="text-foreground font-medium">
                              Detalhes da Encriptação
                            </p>
                            <ul className="space-y-1 text-muted-foreground text-xs">
                              <li>
                                Algoritmo: <strong>AES-256-GCM</strong>
                              </li>
                              <li>
                                Derivação de chave: <strong>PBKDF2</strong>{" "}
                                (100.000 iterações)
                              </li>
                              <li>
                                Salt: <strong>128 bits</strong> (aleatório)
                              </li>
                              <li>
                                IV: <strong>96 bits</strong> (aleatório)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {currentStep === 2 && (
                        <div className="flex items-center justify-between pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                          </Button>
                          <Button
                            onClick={handleProcess}
                            disabled={!canProceedToStep(3) || isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                                A processar...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Codificar Mensagem
                              </>
                            )}
                          </Button>
                        </div>
                      )}

                      {result && !result.success && (
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-center gap-2 text-destructive">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">Erro</span>
                          </div>
                          <p className="mt-2 text-sm text-destructive/90">
                            {result.error}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Step 4: Result & Download */}
                {result?.success && (
                  <Card className="ring-2 ring-primary/50 bg-primary/5">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-primary">
                            Mensagem Codificada com Sucesso!
                          </CardTitle>
                          <CardDescription>
                            A sua imagem está pronta para transferir
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Preview */}
                        {result.downloadUrl && (
                          <div className="relative rounded-xl border border-border bg-card overflow-hidden">
                            <div className="aspect-video relative flex items-center justify-center bg-secondary/30">
                              <img
                                src={result.downloadUrl || "/placeholder.svg"}
                                alt="Imagem com mensagem oculta"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        {result.stats && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Tamanho Original
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                {result.stats.originalSize} bytes
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Bits Codificados
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                {result.stats.encodedBits.toLocaleString(
                                  "pt-PT"
                                )}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Pixels Modificados
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                {result.stats.pixelsModified.toLocaleString(
                                  "pt-PT"
                                )}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs text-muted-foreground mb-1">
                                Capacidade Usada
                              </p>
                              <p className="text-sm font-medium text-foreground">
                                {result.stats.capacityUsed.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex-1" onClick={handleDownload}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Transferir Imagem
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={handleReset}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Nova Codificação
                          </Button>
                        </div>

                        {/* Warning */}
                        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="text-foreground font-medium mb-1">
                                Importante
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Guarde a chave de encriptação em local seguro.
                                Sem ela, não será possível recuperar a mensagem.
                                Use sempre o formato PNG para evitar perda de
                                dados por compressão.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Image Analysis */}
                {imageState && (
                  <ImageAnalysisDisplay
                    analysis={imageState.analysis}
                    messageLength={messageByteLength * 3}
                  />
                )}

                {/* How it Works */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Como Funciona
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                        1
                      </div>
                      <p>
                        A mensagem é encriptada usando <strong>AES-256-GCM</strong>, 
                        um dos algoritmos mais seguros disponíveis.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                        2
                      </div>
                      <p>
                        Os dados encriptados são convertidos em bits e inseridos
                        nos <strong>LSBs</strong> dos canais RGB de cada pixel.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary flex-shrink-0">
                        3
                      </div>
                      <p>
                        As alterações são <strong>imperceptíveis</strong> ao olho humano, 
                        mantendo a imagem visualmente idêntica.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Dicas de Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Use passwords fortes e únicas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Guarde a password em local seguro</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Use imagens PNG para evitar compressão</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Não partilhe a password pelo mesmo canal</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
