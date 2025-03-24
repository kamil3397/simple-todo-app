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
      const response = await axios.post("http://localhost:4000/tasks/add", {
        text: text,
        completed: false
      });
      
      const newTodo: Todo = response.data;
      
      setTodos(prevTodos => [...prevTodos, newTodo]);
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
    try{
     const res = await axios.get("http://localhost:4000/tasks/")
      const fetchedTodos:Todo[] = res.data
      setTodos(fetchedTodos)
    } catch(err){
      console.error('Błąd podczas pobierania todos', err)
    }
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


// const addTodo = (text: string) => {
//   const newTodo: Todo ={
//     id: Date.now(),
//     text: text,
//     completed: false
//   }

// const deleteTodo = (id: string) => {
//   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
// };

// wypchnij to na jakies nowe repo i mnie dodaj i zrob pr