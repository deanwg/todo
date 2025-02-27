import React, { useState } from "react";
import Todo from "./Todo";
import { Reorder } from "framer-motion";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addToDo();
    }
  };
  const addToDo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedToggled = (id) => {
    // if checked, uncheck - if unchecked, check
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed))
  };

  const updateTodo = (id, editText) => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) =>
        todo.id === id ? {...todo, text: editText} : todo
      )
    );
  };

  return (
    <div className=" bg-slate-100 py-5 border border-zinc-900 rounded-3xl shadow-2xl mt-10">
      <h1 className="flex justify-center text-2xl pb-4 font-bold border-b border-dashed border-zinc-300">To Do List</h1>
      <div className="flex flex-col">
        <div className="mb-2">
          <Reorder.Group values={todos} onReorder={setTodos}>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              completedToggled={completedToggled}
              updateTodo={updateTodo}
            />
          ))}
          </Reorder.Group>
        </div>
        <div className="flex flex-row justify-center">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-zinc-200 shadow-lg rounded-sm text-center w-60"
          />
          <button className="bg-green-500 shadow-md p-2 ml-3 rounded-md" onClick={addToDo}>Add Todo</button>
          <button className="bg-red-500 shadow-md p-2 ml-3 rounded-md" onClick={removeCompleted}>Remove all completed todos</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;