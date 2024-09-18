import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
//import { api } from '../../../conexion/api';

export interface Tasks {
  _id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  state: string;
}

/*
export const getTasks = async (user: string): Promise<Tasks[]> => {
  console.log('Entrando al get tasks');
  try {
    const response = await api.get(`/tasks/myTasks/${user}`);
    console.log("Response despues del get: ", response);
    const tasks: Tasks[] = response.data; // Tipamos la respuesta como un arreglo de Tasks
    console.log("Tareas vueltas array: ", tasks);
    return tasks;
  } catch (error) {
    console.error("Error al traer las tareas:", error);
    throw error;
  }
};
*/