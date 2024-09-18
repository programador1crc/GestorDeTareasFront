import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  email: string;
  sub: string;
  nombre: string;
  rol: string;
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  return null;
};

export const handleLogout = (router: ReturnType<typeof useRouter>) => {
  localStorage.removeItem('access_token');
  router.push('/login');
};
