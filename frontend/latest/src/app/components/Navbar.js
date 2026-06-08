'use client';

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const usuario = useAuthStore((state) => state.user);
  const logoutGlobal = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logoutGlobal();
    toast.success("Sessão encerrada.");
    router.push("/"); 
  };

  return (
    <nav className="w-full h-16 bg-[#f5f0e8] border-b border-[#a8c0a0]/20 px-6 md:px-12 flex items-center justify-between font-sans sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#7d9b76] text-[#f5f0e8]">
          <Leaf className="h-5 w-5" />
        </span>
        <span className="font-heading text-xl font-bold tracking-tight text-[#1a2421]">
          EcoCiclo
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {!usuario ? (
          <button
            onClick={() => router.push('/login?aba=login')}
            className="px-4 py-2 border border-[#a8c0a0]/40 rounded-xl text-sm font-medium text-[#1a2421] hover:bg-[#e0d9cc] transition-colors cursor-pointer"
          >
            Entrar
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium hidden sm:inline">
              Olá, {usuario.nome || "Usuário"}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}