import { useReducer, useEffect } from "react";
import TodoList from "./components/TodoList";
import UserBar from "./user/UserBar";
import appReducer from "./reducers";
import { StateContext } from "./contexts";
import CreateTodo from "./components/CreateTodo";
import { useResource } from "react-request-hook";

function App() {
  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  useEffect(() => {
    if (state.user) {
      getTodos();
    }
  }, [state?.user?.access_token]);

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
  }, [todos]);

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
