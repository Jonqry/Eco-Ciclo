'use client';

import { useEffect, useState } from 'react'; // 1. Importado o useState
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const usuario = useAuthStore((state) => state.user);

  // 2. Estado para controlar se o Zustand já leu o localStorage do navegador
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Se o Next.js ainda está processando o F5, interrompe o redirecionamento precoce
    if (!isHydrated) return;

    // 3. CORREÇÃO: Adicionamos a rota '/' aqui para o site saber que ela é pública
    const rotasPublicas = ['/', '/login', '/register'];
    const ehRotaPublica = rotasPublicas.includes(pathname);

    // Se não tem usuário e a rota não for pública (tentando acessar páginas internas)
    if (!usuario && !ehRotaPublica) {
  router.replace('/'); // Agora te joga para a tela inicial limpa!
}

    // Se já tem usuário e tenta entrar na tela de login ou registro manualmente
    if (usuario && (pathname === '/login' || pathname === '/register')) {
      router.replace('/');
    }
  }, [usuario, pathname, isHydrated, router]);

  // 4. Evita que telas privadas deem um "flash" em branco ou quebrem durante o F5
  const ehRotaPublica = ['/', '/login', '/register'].includes(pathname);
  if (!isHydrated && !ehRotaPublica) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7d9b76]"></div>
      </div>
    );
  }

  return <>{children}</>;
}