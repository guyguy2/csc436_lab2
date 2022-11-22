function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

export function todosReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        id: action.id,
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            dateCompleted: action.dateCompleted,
            complete: action.complete,
          };
        }
        return todo;
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "FETCH_TODOS":
      return action.todos.reverse();
    case "CLEAR_TODOS":
      return [];
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todosReducer(state.todos, action),
  };
}
