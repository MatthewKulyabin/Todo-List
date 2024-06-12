import React, { useEffect } from 'react';
import { useTaskStore } from './store/taskStore';

import TodoList from './components/todoList';

function App() {
  const { getTasks, isLoading } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
