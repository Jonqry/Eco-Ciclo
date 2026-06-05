import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

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

<Navbar/>

<div className="flex flex-1">

<Sidebar/>

<main className="flex-1 p-6">

{children}

</main>

</div>

<Footer/>

</body>

</html>

 )

}
