"use client";

import React from "react";

import { type ImageAnalysis } from "@/lib/steganography";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Grid3X3,
  Database,
  Palette,
  Binary,
  BarChart3,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImageAnalysisDisplayProps {
  analysis: ImageAnalysis;
  messageLength?: number;
  className?: string;
}

export function ImageAnalysisDisplay({
  analysis,
  messageLength = 0,
  className,
}: ImageAnalysisDisplayProps) {
  const capacityUsed =
    analysis.capacity.usableBytes > 0
      ? (messageLength / analysis.capacity.usableBytes) * 100
      : 0;

  const getCapacityColor = () => {
    if (capacityUsed > 90) return "text-destructive";
    if (capacityUsed > 70) return "text-orange-500";
    if (capacityUsed > 50) return "text-yellow-500";
    return "text-primary";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "rounded-xl border border-border bg-card/50 overflow-hidden",
          className
        )}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">
              Análise da Imagem
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Dimensions & Pixels */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={ImageIcon}
              label="Dimensões"
              value={`${analysis.width} x ${analysis.height}`}
              tooltip="Largura x Altura em pixels"
            />
            <StatCard
              icon={Grid3X3}
              label="Total de Pixels"
              value={analysis.totalPixels.toLocaleString("pt-PT")}
              tooltip="Número total de pixels na imagem"
            />
          </div>

          {/* Capacity */}
          <div className="p-3 rounded-lg bg-secondary/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Capacidade de Armazenamento
                </span>
              </div>
              <span className={cn("text-sm font-mono", getCapacityColor())}>
                {capacityUsed.toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  capacityUsed > 90
                    ? "bg-destructive"
                    : capacityUsed > 70
                      ? "bg-orange-500"
                      : capacityUsed > 50
                        ? "bg-yellow-500"
                        : "bg-primary"
                )}
                style={{ width: `${Math.min(capacityUsed, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Usado: {formatBytes(messageLength)}</span>
              <span>
                Disponível: {formatBytes(analysis.capacity.usableBytes)}
              </span>
            </div>
          </div>

          {/* Average Color */}
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Cor Média
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded border border-border"
                  style={{
                    backgroundColor: `rgb(${analysis.averageColor.r}, ${analysis.averageColor.g}, ${analysis.averageColor.b})`,
                  }}
                />
                <span className="text-xs font-mono text-muted-foreground">
                  RGB({analysis.averageColor.r}, {analysis.averageColor.g},{" "}
                  {analysis.averageColor.b})
                </span>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground">Formato:</span>{" "}
              {analysis.format}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground">Bits/Pixel:</span>{" "}
              {analysis.bitsPerPixel}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground">Bits Disponíveis:</span>{" "}
              {analysis.capacity.totalBits.toLocaleString("pt-PT")}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground">Método:</span> LSB (1 bit/canal)
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tooltip,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tooltip?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="p-3 rounded-lg bg-secondary/50 cursor-help">
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
          <span className="text-sm font-medium text-foreground">{value}</span>
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
