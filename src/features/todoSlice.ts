import { baseAi } from '../api/baseApi';

export interface Todo {
  id: number;
  description: string;
  isDone: boolean;
}

const todoSlice = baseAi.injectEndpoints({
  endpoints: builder => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      providesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    addTodo: builder.mutation<string, string>({
      query: description => ({
        url: '/todos',
        method: 'POST',
        body: { description },
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    deleteTodo: builder.mutation<Todo, Todo>({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'DELETE',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoSlice;
