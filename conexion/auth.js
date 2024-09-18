// utils/auth.ts
import api from './api';

export const login = async (email , password ) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    
    // Guardar el token en el localStorage o cookies
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};
