import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseAi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Todos'],
  endpoints: builder => ({}),
});
