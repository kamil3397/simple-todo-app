import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async (text: string) => {
    try {
      await axios.post<Todo>("http://localhost:4000/tasks/add", {
        text,
        completed: false
      }) .then(({data})=>{
        setTodos(prevTodos=>[...prevTodos, data])
      })
    } catch (error) {
      console.error("Błąd podczas dodawania zadania:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/task/${id}/delete`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Błąd podczas usuwania zadania:", error);
    }
  };
  
  const fetchTodos = async()=>{
      await axios.get<Todo[]>("http://localhost:4000/tasks")

      .then(({data})=> setTodos(data))

      .catch((err)=> console.error('Błąd podczas pobierania todos', err))
  }

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

useEffect(()=>{
  fetchTodos()
}, [])

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};