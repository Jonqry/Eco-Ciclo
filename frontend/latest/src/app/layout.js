'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { useAuthStore } from "../store/useAuthStore";

import { Providers } from "./providers"; 
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AuthGuard from "./components/AuthGuard"; 
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const usuario = useAuthStore((state) => state.user);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const rotasDeAutenticacao = ['/login', '/register'];
  
  // Navbar e Sidebar aparecem apenas logado (ou em rotas que não sejam login/home deslogada)
  const mostraBarrasDoSistema = montado && !rotasDeAutenticacao.includes(pathname) && (pathname !== '/' || !!usuario);
  
  // Footer aparece em todo o site (incluindo a Home deslogada), EXCETO nas rotas de login e registro
  const mostraFooter = montado && !rotasDeAutenticacao.includes(pathname);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-[#f5f0e8] antialiased text-[#1a2421]">
        <Providers>
          <AuthGuard>

            {mostraBarrasDoSistema && <Navbar />}

            <div className="flex flex-1">
              {mostraBarrasDoSistema && <Sidebar />}

              <main className="flex-1 w-full">
                {children}
              </main>
            </div>

            {/* Alterado para usar a nova variável mostraFooter */}
            {mostraFooter && <Footer />}

          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}