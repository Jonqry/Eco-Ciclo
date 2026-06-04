'use client';

import * as React from "react";
import { useState } from "react";
import Link from "next/link"; 
import { useRouter } from "next/navigation"; 
import { Leaf } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../../store/useAuthStore"; 

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const labelVariants = cva(
  "text-sm font-medium leading-none relative-peer-disabled:cursor-not-allowed relative-peer-disabled:opacity-70 text-[#1a2421]"
);
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = "Label";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-[#a8c0a0]/40 bg-[#f5f0e8]/50 px-3 py-1 text-sm shadow-sm transition-all placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9b76] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9b76] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#7d9b76] text-[#f5f0e8] shadow hover:bg-[#6c8866]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-[#a8c0a0] bg-transparent shadow-sm hover:bg-[#dce5d4] hover:text-[#7d9b76]",
        secondary: "bg-[#dce5d4] text-[#7d9b76] shadow-sm hover:bg-[#cbd6c2]",
        ghost: "hover:bg-[#dce5d4] hover:text-[#7d9b76]",
        link: "text-[#7d9b76] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
Button.displayName = "Button";

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginGlobal = useAuthStore((state) => state.login);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8080/api/usuarios");
      const usuarios = response.data;
      
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === parsed.data.email && u.senha === parsed.data.password
      );

      if (usuarioEncontrado) {
        loginGlobal(usuarioEncontrado);
        
        toast.success("Bem-vindo de volta!");
        router.push("/agendamento");
      } else {
        toast.error("E-mail ou senha incorretos.");
      }
    } catch (err) {
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[1.1fr_1fr] bg-[#f5f0e8]">
      
      <div className="hidden flex-col justify-between bg-[#7d9b76] p-12 text-[#f5f0e8] md:flex">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f5f0e8]/15">
            <Leaf className="h-5 w-5 text-[#f5f0e8]" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight">EcoCiclo</span>
        </Link>
        
        <div className="max-w-md">
          <h2 className="font-heading text-4xl font-bold leading-[1.15]">
            "Pequenos gestos, ciclos completos."
          </h2>
          <p className="mt-4 text-[#f5f0e8]/80 text-base leading-relaxed">
            Cada agendamento na sua conta vira impacto real medido em quilos desviados do aterro.
          </p>
        </div>
        
        <p className="text-xs text-[#f5f0e8]/60">© EcoCiclo</p>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-[#f5f0e8] border-l border-[#a8c0a0]/20">
        <form onSubmit={onSubmit} className="w-full max-w-sm">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1a2421]">Entrar</h1>
          <p className="mt-1.5 text-sm text-[#1a2421]/60">
            Use seu e-mail e senha para acessar.
          </p>

          <div className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/esqueci-senha" className="text-xs font-medium text-[#7d9b76] hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full pt-2" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-[#1a2421]/60">
            Ainda não tem conta?{" "}
            <Link href="/register" className="font-semibold text-[#7d9b76] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}

export default LoginPage;