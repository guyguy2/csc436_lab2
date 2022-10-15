import { useState } from "react";

export default function Todo({ todo, dispatch }) {
  const [complete, setComplete] = useState();
  const [completedOn, setCompletedOn] = useState("");

  function checkValue(e) {
    let checked = e.target.checked;

    if (checked === false) {
      setComplete("true");
      setCompletedOn("");
    } else {
      setComplete("false");
      setCompletedOn(new Date().toLocaleString());
    }
  }

  return (
    <div>
      <h3>{todo.title}</h3>
      <div>{todo.description}</div>
      <br />
      <i>
        Author <b>{todo.author}</b>
      </i>
      <br />
      <input
        type="checkbox"
        id="completed"
        name="completed"
        check={complete}
        onChange={(e) => checkValue(e)}
      ></input>
      <label for="completed">Completed</label>
      <br />
      <i>Created {todo.createdOn}</i> <br />
      <i>Completed on {completedOn}</i>
      <br></br>
      <p>
        <button
          type="button"
          onClick={() => {
            console.log("Delete button clicked");
            dispatch({ type: "DELETE_TODO", id: todo.id });
          }}
        >
          Delete
        </button>
      </p>
      <hr></hr>
    </div>
  );
}
