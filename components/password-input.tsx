"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X, ShieldCheck, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calculatePasswordStrength } from "@/lib/crypto";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  label?: string;
  description?: string;
  confirmValue?: string;
  onConfirmChange?: (value: string) => void;
  showConfirm?: boolean;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Introduza a chave de encriptação",
  showStrength = true,
  label = "Chave de Encriptação",
  description,
  confirmValue,
  onConfirmChange,
  showConfirm = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState<ReturnType<
    typeof calculatePasswordStrength
  > | null>(null);

  useEffect(() => {
    if (showStrength && value) {
      setStrength(calculatePasswordStrength(value));
    } else {
      setStrength(null);
    }
  }, [value, showStrength]);

  const getStrengthColor = (level: string) => {
    switch (level) {
      case "fraca":
        return "bg-destructive";
      case "razoável":
        return "bg-orange-500";
      case "boa":
        return "bg-yellow-500";
      case "forte":
        return "bg-primary";
      case "muito forte":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  const getStrengthTextColor = (level: string) => {
    switch (level) {
      case "fraca":
        return "text-destructive";
      case "razoável":
        return "text-orange-500";
      case "boa":
        return "text-yellow-500";
      case "forte":
        return "text-primary";
      case "muito forte":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const passwordsMatch =
    showConfirm && confirmValue !== undefined && value === confirmValue;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pr-12 font-mono"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Password Strength Meter */}
      {showStrength && strength && value && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Força da password:
            </span>
            <span
              className={cn(
                "text-xs font-medium capitalize",
                getStrengthTextColor(strength.level)
              )}
            >
              {strength.level}
            </span>
          </div>

          {/* Strength Bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300",
                getStrengthColor(strength.level)
              )}
              style={{ width: `${strength.score}%` }}
            />
          </div>

          {/* Feedback */}
          {strength.feedback.length > 0 && (
            <ul className="space-y-1">
              {strength.feedback.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-muted-foreground flex items-center gap-2"
                >
                  <X className="h-3 w-3 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Requirements checklist - Simplified */}
          <div className="grid grid-cols-1 gap-2 pt-2">
            <RequirementItem met={value.length >= 6} text="Pelo menos 6 caracteres" />
          </div>
        </div>
      )}
    </div>
  );
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs",
        met ? "text-primary" : "text-muted-foreground"
      )}
    >
      {met ? (
        <Check className="h-3 w-3 text-primary" />
      ) : (
        <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
      )}
      {text}
    </div>
  );
}
