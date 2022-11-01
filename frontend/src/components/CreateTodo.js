import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateToDo({ user, dispatch }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_TODO",
          title,
          description,
          author: user,
          id: uuidv4(),
          createdOn: new Date().toLocaleString(),
        });
      }}
    >
      <div>
        <h3 style={{ color: "blue" }}>Create a new ToDo Item</h3>
        <b>Author: </b>
        <b>{user}</b>
      </div>
      <br />
      <div>
        <label htmlFor="create-title">
          <b> Title (*req):</b>{" "}
        </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          size="24"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <br />
      <label htmlFor="create-desc">
        <b> Description:</b>{" "}
      </label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}
