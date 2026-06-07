'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const usuario = useAuthStore((state) => state.user);

  useEffect(() => {
    const rotasPublicas = ['/login', '/register'];
    const ehRotaPublica = rotasPublicas.includes(pathname);

    if (!usuario && !ehRotaPublica) {
      router.replace('/login');
    }

    if (usuario && ehRotaPublica) {
      router.replace('/');
    }
  }, [usuario, pathname, router]);

  return <>{children}</>;
}