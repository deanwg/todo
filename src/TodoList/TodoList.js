import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addToDo = () => {
    if (input) {
      const newTodo = {
        id: Date.now(),
        text: input,
      };

      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo}></Todo>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addToDo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
