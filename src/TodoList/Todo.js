import React from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Todo = ({ todo, deleteTodo, completedToggled }) => {
  return (
    <div className="flex flex-row justify-between">
      <Checkbox onChange={() => completedToggled(todo.id)} />
      <span className={`${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </span>
      <IconButton onClick={() => deleteTodo(todo.id)}>
        <DeleteIcon />
      </IconButton>

      {/* TODO: (hehe) Be able to grab and reorder todos
    <DehazeIcon /> */}
    </div>
  );  
};

export default Todo;
