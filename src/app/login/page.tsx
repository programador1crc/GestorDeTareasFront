"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../../conexion/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Llamar al servicio de login
      const response = await login(email, password);
      const token = response.data.access_token;
      localStorage.setItem('access_token',token);
      // Redirigir al usuario después de iniciar sesión
      router.push('/tasks');
    } catch (error) {
      console.error('Login fallido:', error);
      // Manejar el error
    }
  };

  /*
  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
  */

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded p-4 shadow-lg bg-light" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="mb-4 text-center">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );

};

export default LoginPage;
