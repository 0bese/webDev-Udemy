import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
  //input area
  const [inputText, setInputText] = useState("");
  //Array to hold toDo List
  const [items, setItems] = useState([]);

  //save value in input field
  function handleChange(event) {
    const inputValue = event.target.value;
    setInputText(inputValue);
  }

  //Add value in input field to array, and clean field
  function handleAddItem() {
    setItems((prevItems) => [...prevItems, inputText]);
    setInputText("");
  }

  //Delete todo item when clicked on
  function handleDelete(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => index !== id);
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={handleAddItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <TodoItem
              key={index}
              id={index}
              text={todoItem}
              checked={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
