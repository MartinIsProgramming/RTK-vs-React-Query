import { TrashIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  getTodos,
  updateTodo,
  deleteTodo,
  createTodo,
} from '../../api/baseApi';
import { queryClient } from '../main';

export const TodoList = () => {
  const { data: todos } = useQuery('todos', getTodos, {
    initialData: [],
  });

  const [description, setDescription] = useState<string>('');

  const updateMutation = useMutation(updateTodo, {
    onSettled: () => queryClient.invalidateQueries('todos'),
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSettled: () => queryClient.invalidateQueries('todos'),
  });

  const createMutation = useMutation(createTodo, {
    onSettled: () => queryClient.invalidateQueries('todos'),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTodo = e.target.value;
    setDescription(newTodo);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate(description);
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto space-y-3 mt-28">
      {todos?.map(todo => (
        <div
          key={todo.id}
          className={`bg-pink-600 p-4 rounded text-gray-100 flex justify-between items-center ${
            todo.isDone && 'line-through'
          }`}
        >
          <div>{todo.description}</div>
          <div className="space-x-3">
            <button onClick={() => deleteMutation.mutate(todo)}>
              <TrashIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                updateMutation.mutate({ ...todo, isDone: !todo.isDone });
              }}
            >
              <CheckCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          className="w-full border-gray-300 rounded"
          type="text"
          value={description}
          onChange={handleChange}
        />

        <button
          className="px-3 py-2 text-sm text-gray-100 bg-pink-600 rounded"
          type="submit"
        >
          add todo
        </button>
      </form>
    </div>
  );
};
