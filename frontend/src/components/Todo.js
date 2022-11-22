import { useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  id,
  complete,
  dateCompleted,
}) {
  const { state, dispatch } = useContext(StateContext);

  const [deleted, deleteTodo] = useResource((id) => ({
    url: "/todos/" + id,
    method: "DELETE",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [updated, updateTodo] = useResource(
    (id, title, description, author, dateCreated, complete, dateCompleted) => ({
      url: "/todos/" + id,
      method: "PATCH",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title: title,
        description: description,
        author: author,
        dateCreated: dateCreated,
        dateCompleted: dateCompleted,
        complete,
      },
    })
  );

  function toggleItem(id, title, description, author, dateCreated, complete) {
    var d = Date(Date.now());
    if (!complete) {
      dateCompleted = d;
    } else {
      dateCompleted = null;
    }
    complete = !complete;
    updateTodo(
      author,
      title,
      description,
      author,
      dateCreated,
      complete,
      dateCompleted
    );
    dispatch({ type: "TOGGLE_TODO", id, dateCompleted, complete });
  }

  function deleteItem(id) {
    console.log("Delete button clicked");
    deleteTodo(author);
    dispatch({ type: "DELETE_TODO", id });
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <br />
      <i>
        Author: <b>{author}</b>
      </i>
      <br />
      <i>Created {dateCreated}</i>
      <br />
      <div>
        <i>
          <label>Completed?</label>
        </i>
        <input
          type="checkbox"
          checked={complete}
          onClick={() =>
            toggleItem(id, title, description, author, dateCreated, complete)
          }
          value={complete}
        ></input>
      </div>
      <i>Completed on {dateCompleted}</i>
      <br />
      <button onClick={() => deleteItem(id)}>Delete</button>
      <hr></hr>
    </div>
  );
}
