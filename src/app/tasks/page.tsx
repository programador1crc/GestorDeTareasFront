//"use client";
//
//// pages/dashboard.tsx
//import { useEffect, useState } from 'react';
//import { useRouter } from 'next/navigation';
//import { jwtDecode } from 'jwt-decode';  // Importación correcta
//
//interface DecodedToken {
//  email: string;
//  sub: string;
//  nombre: string;
//  rol: string;
//}
//
//const DashboardPage = () => {
//  const router = useRouter();
//  const [userData, setUserData] = useState<DecodedToken | null>(null);
//
//  useEffect(() => {
//    const token = localStorage.getItem('access_token');
//    
//    if (token == null) {
//      // Si no hay token, redirigir al login
//      router.push('/login');
//    } else {
//      try {
//        const decodedToken: DecodedToken = jwtDecode(token); // Decodifica el token
//        setUserData(decodedToken); // Actualiza los datos del usuario
//      } catch (error) {
//        console.error("Error al decodificar el token:", error);
//      }
//    }
//  }, [router]); // Añadir 'router' como dependencia
//
//  return (
//    <div>
//      <h1>Bienvenido al Dashboard</h1>
//      <div>
//        {userData ? (
//          <div>
//            <p className='ocultar'>User ID: {userData.sub}</p>
//            <p>Nombre: {userData.nombre}</p>
//            <p>Email: {userData.email}</p>
//            <p>Rol: {userData.rol}</p>
//          </div>
//        ) : (
//          <p>No user data available</p>
//        )}
//      </div>
//    </div>
//  );
//};
//
//export default DashboardPage;
//



"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDecodedToken, handleLogout, DecodedToken } from '../../utils/utils'; // Ajusta la ruta según tu estructura
import { Tasks } from './tasksts';
import { getTasks } from './tasksjs';


const TasksPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodedToken = getDecodedToken();
    const fetchTasks = async (userId: string) => {
      try {
        const response = await getTasks(userId);
        setTasks(response); // Guardar los usuarios en el estado
        setLoading(false); // Dejar de mostrar el estado de cargando
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    if (decodedToken == null) {
      router.push("/login");
    } else {
      setUserData(decodedToken);
      const user = decodedToken == null ? "none" : decodedToken.sub;
      if (user == "none") {
        handleLogout(router);
      } else {
        fetchTasks(user); // Llamar a la API para obtener usuarios al montar el componente
      }
    }
  }, [router]);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="container mt-4">
      <br/><br/><br/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Bienvenido al Dashboard - {userData ? <b>{userData.nombre}</b> : <b>No user data available</b>}</h1>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleLogout(router)}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Usuario</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.userName}</td>
                <td>{task.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksPage;
