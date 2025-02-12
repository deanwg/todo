import React, { useEffect, useRef,  useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import {Check as CheckIcon, Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon, Dehaze as DehazeIcon } from "@mui/icons-material";
import { useDrag, useDrop } from "react-dnd";

const ITEM_TYPE = "TODO";

const Todo = ({ todo, deleteTodo, completedToggled, updateTodo, index, moveTodo }) => {
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

  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


const [, dropRef] = useDrop({
  accept: ITEM_TYPE,
  hover: (draggedItem) => {
    if (draggedItem.index !== index) {
      moveTodo(draggedItem.index, index);
      draggedItem.index = index; 
    }
  },
});

  const checkFunction = () => {
    updateTodo(todo.id, editText);
    setIsEditing(false);
  }

  const closeFunction = () => {
    setEditText(todo.text);
    setIsEditing(false);
  }


  return (
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`flex flex-row justify-between border items-center px-4 py-2 
          ${ isDragging ? "opacity-50 shadow-lg" : "opacity-100"}`}
      >
      <span>
      <DehazeIcon className="cursor-grab" />
      <Checkbox onChange={() => completedToggled(todo.id)} />
        </span>
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
      </div>
      )}
    </div>
  );
};

export default Todo;