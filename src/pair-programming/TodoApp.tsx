import React, { useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
  ]); 
  const addTodo = (text: string) => {
    const newTodo: Todo ={
      id: Date.now(),
      text: text,
      completed: false
    }

    setTodos(prevTodos => [...prevTodos, newTodo])
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo))
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

// wypchnij to na jakies nowe repo i mnie dodaj i zrob pr