module.exports = () => {
  const data = { todos: [] };

  for (let i = 0; i < 5; i++) {
    data.todos.push({
      id: i,
      description: `Some todo description for task ${i}`,
      isDone: false,
    });
  }
  return data;
};
