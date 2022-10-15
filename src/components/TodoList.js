import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch }) {
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={p.id} todo={p} dispatch={dispatch} />
      ))}
    </div>
  );
}
