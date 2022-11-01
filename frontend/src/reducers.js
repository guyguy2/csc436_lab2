function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        id: action.id,
        createdOn: action.createdOn,
        completedOn: action.completedOn,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      console.log("Toggle todo");
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case "DELETE_TODO":
      console.log("Delete todo");
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
