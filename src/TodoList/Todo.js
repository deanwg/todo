import React, { useEffect, useRef,  useState } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Checkbox, IconButton } from "@mui/material";
import {Check as CheckIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

export const Todo = ({ todo, deleteTodo, completedToggled, updateTodo }) => {
  const [editText, setEditText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (event) =>{
    if(event.key === "Enter") {
      updateTodo(todo.id, editText);
      setIsEditing(false);
    } else if (event.key ==="Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  const checkFunction = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  }

  const closeFunction = () => {
    setEditText(todo.text);
    setIsEditing(false);
  }


  return (
    <div className="flex flex-row justify-between border">
      <Checkbox onChange={() => completedToggled(todo.id)} />
      {isEditing ? (
        <input 
          ref={inputRef}
          type="text"
          value={editText} 
          className="bg-zinc-200 shadow-md rounded-sm text-center w-60 h-8 my-1"
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span className={`flex items-center ${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </span>
      )} 

      {isEditing ? (
        <div>
          <IconButton onClick={() => checkFunction()}>
            <CheckIcon className="[&>path]:fill-green-500"/>
          </IconButton>
          <IconButton onClick={() => closeFunction()}>
            <CloseIcon className="[&>path]:fill-red-500"/>
          </IconButton>
        </div>
      ) : (
        <div>
        <IconButton onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon className="[&>path]:fill-red-500"/>
        </IconButton>
        <IconButton  onClick={() => setIsEditing(true)}>
          <EditIcon className="[&>path]:fill-yellow-500"/>
        </IconButton>
              {/* TODO: (hehe) Be able to grab and reorder todos
      <DehazeIcon /> */}
      </div>
      )}
    </div>
  );
};