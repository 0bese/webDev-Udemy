import React, { useState } from "react";

const TodoItem = (props) => {
  const [cross, setCross] = useState(false);

  //   //for crossing out todo item
  //   function crossItem() {
  //     setCross((prev) => {
  //       return !prev;
  //     });
  //   }

  return (
    <li
      //   style={cross ? { textDecoration: "line-through" } : null}
      //   onClick={crossItem}

      onClick={() => {
        props.checked(props.id);
      }}
    >
      {props.text}
    </li>
  );
};

export default TodoItem;
