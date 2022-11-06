import { useResource } from "react-request-hook";
export default function Todo({
  title,
  description,
  author,
  dateCreated,
  dispatch,
  id,
  complete,
  dateCompleted,
}) {
  const [deleted, deleteTodo] = useResource((id) => ({
    url: "/todos/" + id,
    method: "DELETE",
  }));

  const [updated, updateTodo] = useResource(
    (id, title, description, author, dateCreated, complete, dateCompleted) => ({
      url: "/todos/" + id,
      method: "PUT",
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
      id,
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
    deleteTodo(id);
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
