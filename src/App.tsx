import { FormEvent, useRef, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  todo: string;
  status: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.length === 0) {
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        todo: `${inputRef.current?.value}`,
        status: false,
      },
    ]);
    setTodo("");
  };

  const handleDone = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <form className="input-area">
        <input
          ref={inputRef}
          className="input-box"
          type="text"
          placeholder="Create your todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="add-button"
          type="submit"
          onClick={(e) => handleAdd(e)}
        >
          Add
        </button>
      </form>
      <ul className="list-box">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-list">
            <li
              className={`todo-text ${todo.status ? "done" : ""}`}
              onClick={() => handleDone(todo.id)}
            >
              {todo.todo}
            </li>
            <div className="x-button" onClick={() => handleDelete(todo.id)}>
              X
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
