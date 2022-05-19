import { TrashIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { ChangeEvent, FormEvent, useState } from 'react';

export const TodoList = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTodo = e.target.value;
    setTodo(newTodo);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(todo);
    setTodo('');
  };

  return (
    <div className="max-w-md mx-auto mt-28">
      <div
        className={`bg-pink-600 p-4 rounded text-gray-100 flex justify-between items-center ${
          isDone && 'line-through'
        }`}
      >
        <div>trash done delete</div>
        <div className="space-x-3">
          <button>
            <TrashIcon className="h-5 w-5" />
          </button>
          <button onClick={() => setIsDone(!isDone)}>
            <CheckCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

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
