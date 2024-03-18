import React, { useState } from "react";

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
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText}/>
        <button onClick={handleAddItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <li key={index}>{todoItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
