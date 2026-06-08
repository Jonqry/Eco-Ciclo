'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  User, 
  Calendar, 
  MapPin, 
  Award, 
  Flame, 
  LogOut 
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const usuario = useAuthStore((state) => state.user);
  const logoutGlobal = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logoutGlobal();
    toast.success("Sessão encerrada com sucesso.");
    router.push("/"); 
  };

  const menuItems = [
    {
      title: "Meu Perfil",
      href: "/profile",
      icon: User,
      description: "Dados e configurações"
    },
    {
      title: "Agendar Coleta",
      href: "/form",
      icon: Calendar,
      description: "Marcar novos descartes"
    },
    {
      title: "Pontos de Coleta",
      href: "/pontos-de-coleta",
      icon: MapPin,
      description: "Locais parceiros próximos"
    },
    {
      title: "Minhas Recompensas",
      href: "/rewards",
      icon: Award,
      description: "Resgatar prêmios e cupons"
    },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-[#f5f0e8] border-r border-[#a8c0a0]/20 flex flex-col justify-between p-4 font-sans sticky top-16">
      
      <div className="space-y-6">
        
        {usuario && (
          <div className="bg-[#dce5d4]/40 border border-[#a8c0a0]/30 rounded-xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs text-[#1a2421]/50 font-medium">Seus Pontos</span>
              <span className="text-lg font-bold text-[#7d9b76] leading-none mt-1">
                {usuario.totalPontos || 0} <span className="text-xs font-normal text-[#1a2421]/60">ECO</span>
              </span>
            </div>
            <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-lg" title="Dias de Ofensiva Ativa">
              <Flame className="h-4 w-4 fill-current animate-pulse" />
              <span className="text-xs font-bold">{usuario.streak || 0}d</span>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-[#7d9b76] text-[#f5f0e8] shadow-sm"
                    : "text-[#1a2421]/70 hover:bg-[#dce5d4]/50 hover:text-[#7d9b76]"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-[#f5f0e8]" : "text-[#7d9b76] group-hover:scale-105 transition-transform"}`} />
                <div className="flex flex-col min-w-0">
                  <span className="truncate leading-normal">{item.title}</span>
                  <span className={`text-[10px] font-normal truncate leading-none mt-0.5 ${isActive ? "text-[#f5f0e8]/70" : "text-[#1a2421]/40"}`}>
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}