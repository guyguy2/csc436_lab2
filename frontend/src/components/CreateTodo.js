import { useState, useContext, useEffect } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import { v4 as uuid } from "uuid";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  var d = Date(Date.now());

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createTodo] = useResource(
    ({ title, description, author, id, dateCreated, complete }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, description, author, id, dateCreated, complete },
    })
  );

  useEffect(() => {
    if (post.isLoading === false && post.data) {
      dispatch({
        type: "CREATE_TODO",
        title: post.data.title,
        content: post.data.content,
        id: post.data._id,
        author: user.username,
        completed: false,
        completedOn: "",
        login: user.username,
      });
    }
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const temp_id = uuid();
        createTodo({
          title,
          description,
          author: user,
          id: temp_id,
          dateCreated: d,
          complete: false,
        });
      }}
    >
      <div>
        <h3 style={{ color: "blue" }}>Create a new ToDo Item</h3>
        <b>Author: </b>
        <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">
          <b> Title (*req):</b>{" "}
        </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <label htmlFor="create-desc">
        <b> Description:</b>{" "}
      </label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br></br>
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}
