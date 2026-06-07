'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation"; 

import { Providers } from "./providers"; 
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AuthGuard from "./components/AuthGuard"; 

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"]
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"]
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const rotasDeAutenticacao = ['/login', '/register'];
  const ehRotaPublica = rotasDeAutenticacao.includes(pathname);

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#f5f0e8] antialiased">
        <Providers>
          <AuthGuard>

            {!ehRotaPublica && <Navbar />}

            <div className="flex flex-1">
              {!ehRotaPublica && <Sidebar />}

              <main className="flex-1">
                {children}
              </main>
            </div>

            {!ehRotaPublica && <Footer />}

          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}