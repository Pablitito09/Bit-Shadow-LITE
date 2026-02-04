"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import {
  Upload,
  ImageIcon,
  X,
  FileImage,
  Info,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeImage, loadImage, type ImageAnalysis } from "@/lib/steganography";

interface ImageDropzoneProps {
  onImageLoad: (data: {
    file: File;
    imageData: ImageData;
    width: number;
    height: number;
    preview: string;
    analysis: ImageAnalysis;
  }) => void;
  currentImage?: string | null;
  onClear?: () => void;
  disabled?: boolean;
}

export function ImageDropzone({
  onImageLoad,
  currentImage,
  onClear,
  disabled,
}: ImageDropzoneProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsLoading(true);
      setError(null);

      try {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          throw new Error("Por favor, selecione um ficheiro de imagem válido");
        }

        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          throw new Error("O ficheiro é demasiado grande. Máximo: 50MB");
        }

        const { imageData, width, height } = await loadImage(file);
        const analysis = analyzeImage(imageData);
        const preview = URL.createObjectURL(file);

        onImageLoad({ file, imageData, width, height, preview, analysis });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar a imagem"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onImageLoad]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    disabled: disabled || isLoading,
  });

  if (currentImage) {
    return (
      <div className="relative rounded-xl border border-border bg-card overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center bg-secondary/30">
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Imagem selecionada"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {onClear && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 h-8 w-8"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all cursor-pointer",
          "flex flex-col items-center justify-center p-8 md:p-12",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30",
          disabled && "opacity-50 cursor-not-allowed",
          isLoading && "pointer-events-none"
        )}
      >
        <input {...getInputProps()} />

        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground">
              A carregar imagem...
            </p>
          </div>
        ) : isDragActive ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileImage className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-primary">
              Largue a imagem aqui
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPEG, BMP ou WebP (máx. 50MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Nota:</strong> Para melhores
          resultados, use imagens PNG sem compressão. Imagens JPEG podem perder
          dados durante a compressão.
        </p>
      </div>
    </div>
  );
}
