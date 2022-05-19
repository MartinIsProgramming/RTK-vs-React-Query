import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/solid';
import {
  Todo,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} from '../features/todoSlice';

export const TodoList = () => {
  const { data: todos } = useGetAllTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [todo, setTodo] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTodo = e.target.value;
    setTodo(newTodo);
  };

  const toggleIsDone = useCallback(
    (todo: Todo) => updateTodo({ ...todo, isDone: !todo.isDone }),
    []
  );

  const handleDelete = useCallback((todo: Todo) => deleteTodo(todo), []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };

  return (
    <div className="max-w-md mx-auto mt-28 space-y-3">
      {todos?.map(todo => (
        <div
          key={todo.id}
          className={`bg-pink-600 p-4 rounded text-gray-100 flex justify-between items-center ${
            todo.isDone && 'line-through'
          }`}
        >
          <div>{todo.description}</div>
          <div className="space-x-3">
            <button onClick={() => handleDelete(todo)}>
              <TrashIcon className="h-5 w-5" />
            </button>
            <button onClick={() => toggleIsDone(todo)}>
              <CheckCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          className="w-full border-gray-300 rounded"
          type="text"
          value={todo}
          onChange={handleChange}
        />

        <button
          className="bg-pink-600 text-gray-100 py-2 px-3 rounded text-sm"
          type="submit"
        >
          add todo
        </button>
      </form>
    </div>
  );
};
