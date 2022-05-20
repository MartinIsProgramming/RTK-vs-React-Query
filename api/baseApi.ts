import axios from 'axios';

export const BASE_URL = 'http://localhost:3500';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export interface Todo {
  id: number;
  description: string;
  isDone: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axiosClient.get('/todos');
  return res.data;
};

export const getTodo = async (id: number): Promise<Todo> => {
  const res = await axiosClient.get(`/todos/${id}`);
  return res.data;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const res = await axiosClient.post(`/todos`, { description });
  return res.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await axiosClient.put(`/todos/${todo.id}`, todo);
  return res.data;
};

export const deleteTodo = async (todo: Todo): Promise<Todo> => {
  const res = await axiosClient.delete(`/todos/${todo.id}`);
  return res.data;
};
