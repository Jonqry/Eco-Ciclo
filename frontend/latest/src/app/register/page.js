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
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
  address: z.string().trim().max(200).optional(),
});

function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/usuarios", {
        nome: parsed.data.name,
        email: parsed.data.email,
        senha: parsed.data.password,
      });

      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (err) {
      const msgErro = err.response?.data?.message || "Erro ao realizar o cadastro.";
      toast.error(msgErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-[1fr_1.1fr] bg-[#f5f0e8]">
      <div className="flex items-center justify-center p-6 md:p-12 bg-[#f5f0e8]">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[#7d9b76] hover:opacity-90 transition-opacity">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#7d9b76] text-[#f5f0e8]">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-[#1a2421]">EcoCiclo</span>
          </Link>
          
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1a2421]">Criar conta</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={form.name} onChange={set("name")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={form.password} onChange={set("password")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Endereço (opcional)</Label>
              <Input id="address" value={form.address} onChange={set("address")} placeholder="Rua, número, bairro" />
            </div>
            
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#1a2421]/60">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-[#7d9b76] hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden bg-[#dce5d4] p-12 md:block border-l border-[#a8c0a0]/20">
        <div className="flex h-full flex-col justify-center max-w-md mx-auto">
          <h2 className="font-heading text-4xl font-bold leading-[1.15] text-[#1a2421]">
            Recompensas por cada quilo reciclado.
          </h2>
          <p className="mt-4 text-[#1a2421]/70 text-base leading-relaxed">
            Cadastre-se para acompanhar suas coletas, manter sua ofensiva semanal e
            trocar pontos por descontos em parceiros locais.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;