import Link from "next/link";
import { Shield, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    BitShadow
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Steganography
                  </span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Aplicação de esteganografia profissional desenvolvida como
                projeto académico no ISTEC - Instituto Superior de Tecnologias Avançadas. 
                Utiliza encriptação AES-256 e o método LSB
                para ocultar mensagens em imagens de forma segura e
                imperceptível.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:email@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Aplicação</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/encode"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Codificar Mensagem
                  </Link>
                </li>
                <li>
                  <Link
                    href="/decode"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Descodificar Mensagem
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentação
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/documentation#lsb"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Método LSB
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation#aes"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Encriptação AES
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation#security"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">
                2024 BitShadow. Projeto académico de Segurança Informática.
              </p>
              <p className="text-xs text-primary font-medium mt-1">
                Desenvolvido por Tomás Gaspar 2024164 - ISTEC (Instituto Superior de Tecnologias Avançadas)
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                Next.js | TypeScript | Web Crypto API
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
