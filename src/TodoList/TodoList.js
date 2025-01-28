import React, { useEffect, useState } from "react";
import Todo from "./Todo";

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

  return (
    <div>
      <h1>ToDo List</h1>
      <div className="flex flex-col">
        <div>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              completedToggled={completedToggled}
            ></Todo>
          ))}
        </div>
        <div className="flex flex-row justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-blue"
          />
          <button onClick={addToDo}>Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
