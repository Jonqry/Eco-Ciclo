'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const usuario = useAuthStore((state) => state.user);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const rotasPublicas = ['/', '/login', '/register'];
    const ehRotaPublica = rotasPublicas.includes(pathname);

    if (!usuario && !ehRotaPublica) {
  router.replace('/');
}

    if (usuario && (pathname === '/login' || pathname === '/register')) {
      router.replace('/');
    }
  }, [usuario, pathname, isHydrated, router]);

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