//import axios from 'axios';
//
//const API_URL = 'http://localhost:5555/auth/login';
//
//export const login = async (email, password) => {
//  try {
//    const response = await axios.post(API_URL, { email, password });
//    return response.data;
//  } catch (error) {
//    throw new Error(error.response ? error.response.data.message : error.message);
//  }
//};



//import axios from 'axios';
//
//// Configuración de Axios
//const api = axios.create({
//  baseURL: 'http://localhost:5555/api', // URL de tu back-end
//});
//
//export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555/api',
});

// Interceptar las solicitudes para añadir el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;