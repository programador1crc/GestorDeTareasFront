
import api from '../../../conexion/api';
/*
export interface Tasks {
  _id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  state: string;
}
*/
export const getTasks = async (user ) => {
  try {
    const url = '/tasks/myTasks/'+user;
    const response = await api.get(url);
    const tasks = response.data.data;
    return tasks;
  } catch (error) {
    console.error('Error al traer las tareas js:', error);
    throw error;
  }
};