"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      // Si no hay token, redirigir al login
      router.push('/login');
    }
    else{
      // Si hay token, redirigir al dashboard
      router.push('/tasks')
    }
  }, [router]);
  return (
    <p>Cargando...</p>
  );
}
