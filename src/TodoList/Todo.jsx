import React, { useEffect, useRef,  useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import {Check as CheckIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon, Dehaze as DehazeIcon } from "@mui/icons-material";
import { Reorder, useDragControls } from "framer-motion";

const Todo = ({ todo, deleteTodo, completedToggled, updateTodo }) => {
  const [editText, setEditText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (event) =>{
    if(event.key === "Enter") {
      checkFunction();
    } else if (event.key ==="Escape") {
      closeFunction();
    }
  }

  const mouseDownHandler = (event) => {
    Event.preventDefault();
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
    <Reorder.Item 
      key ={todo.id} 
      value={todo}
      dragListener={false}
      dragControls={dragControls}
    >
      <div  className="flex flex-row justify-between border items-center px-4 py-2">
        <div className="flex items-center">
          <DehazeIcon className="cursor-grab" onPointerDown={(e) => dragControls.start(e)}/>
          <Checkbox onChange={() => completedToggled(todo.id)} />
        </div>
      
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
          <span className={`flex items-center max-w-lg ${todo.completed ? "line-through" : ""}`}>
            {todo.text}
          </span>
        )} 

        {isEditing ? (
          <div>
            {/* onMouseDown required because the onBlur for the input field fires before onClick but after onMouseDown */}
            <IconButton onMouseDown={() => checkFunction()}>
              <CheckIcon className="[&>path]:fill-green-500"/>
            </IconButton>
            <IconButton onMouseDown={() => closeFunction()}>
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
          </div>
        )}
      </div>
    </Reorder.Item>
  );
};  


export default Todo;