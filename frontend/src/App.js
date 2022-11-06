import { useReducer, useEffect } from "react";
import TodoList from "./components/TodoList";
import UserBar from "./user/UserBar";
import appReducer from "./reducers";
import { StateContext } from "./contexts";
import CreateTodo from "./components/CreateTodo";
import { useResource } from "react-request-hook";

function App() {
  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse() });
    }
  }, [todos]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  return (
    <div>
      <h1 style={{ color: "blue" }}>ToDo List</h1>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <TodoList />
        {state.user && <CreateTodo />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
