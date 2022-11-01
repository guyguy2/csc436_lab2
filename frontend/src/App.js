// TODO - Login, Registration, and Logout
//A Todolist containing individual Todo items
//A form to add new Todo to the Todolist.
//checkbox, title, author, desc

import { useReducer } from "react";

import UserBar from "./user/UserBar";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import { v4 as uuidv4 } from "uuid";

import appReducer from "./reducers";

function App() {
  const initialTodos = [
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
    todos: initialTodos,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} dispatch={dispatch} />
      {state.user && (
        <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
