import { useState } from "react";

export default function Post({ title, description, author, createdOn }) {
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
      <h3>{title}</h3>
      <div>{description}</div>
      <br />
      <i>
        Author <b>{author}</b>
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
      <i>Created {createdOn}</i> <br />
      <i>Completed on {completedOn}</i>
      <br></br>
      <hr></hr>
    </div>
  );
}
