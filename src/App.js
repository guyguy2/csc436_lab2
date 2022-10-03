// TODO - Login, Registration, and Logout
//A Todolist containing individual Todo items
//A form to add new Todo to the Todolist.
//checkbox, title, author, desc

import { useReducer } from "react";

import UserBar from "./user/UserBar";
import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";
import { v4 as uuidv4 } from "uuid";

import appReducer from "./reducers";

function App() {
  const initialPosts = [
    {
      title: "ToDo Sample Item 1",
      description: "Some content",
      author: "Guy",
      createdOn: new Date().toLocaleString(),
      completedOn: "",
      id: uuidv4(),
    },
    {
      title: "ToDo Sample Item 2",
      description: "Some content",
      author: "Guy",
      createdOn: new Date().toLocaleString(),
      completedOn: "",
      id: uuidv4(),
    },
  ];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialPosts,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <PostList posts={state.posts} />
      {state.user && (
        <CreatePost user={state.user} posts={state.posts} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
