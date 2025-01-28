import React from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Checkbox from "@mui/material/Checkbox";

const Todo = ({ todo }) => {
  return (
    <div className="flex flex-row justify-between">
      <Checkbox />
      {todo.text}
      <button>Delete</button>
      <DehazeIcon className="content-center" />
    </div>
  );
};

export default Todo;
