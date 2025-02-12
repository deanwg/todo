import React from "react";
import TodoList from "./TodoList/TodoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TodoList />
      </div>
    </DndProvider>
  );
};

export default App;
