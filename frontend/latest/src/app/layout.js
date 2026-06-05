import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. LINHA ADICIONADA: Importa o arquivo de configuração que você criou
import { Providers } from "./providers"; 

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets:["latin"]
});

const geistMono = Geist_Mono({
 variable:"--font-geist-mono",
 subsets:["latin"]
});

export const metadata = {
 title:"Eco Ciclo",
 description:"Sistema de reciclagem"
};

export default function RootLayout({children}) {
 return (
  <html
    lang="pt-BR"
    className={`${geistSans.variable} ${geistMono.variable}`}
  >
    <body className="min-h-screen flex flex-col">
      {/* 2. LINHA ADICIONADA: Envolve todo o site para ativar o TanStack Query */}
      <Providers>
        
        <Navbar/>

        <div className="flex flex-1">
          <Sidebar/>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

        <Footer/>

      </Providers>
    </body>
  </html>
 )
}
