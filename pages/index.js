import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todos, setTodo] = useState([]);
  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("todo-react", todosStr);
  }, [todos]);

  useEffect(() => {
    const todoStr = localStorage.getItem("todo-react");
    if (!todoStr) setTodo([]);
    else setTodo(JSON.parse(todoStr));
  }, []);

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    setTodo([...todos]);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodo([...todos]);
  };

  const moveUp = (idx) => {
    if (idx == 0) return;
    let a = todos[idx];
    todos[idx] = todos[idx - 1];
    todos[idx - 1] = a;
    setTodo([...todos]);
  };

  const moveDown = (idx) => {
    if (idx == todos.length - 1) return;
    let b = todos[idx];
    todos[idx] = todos[idx + 1];
    todos[idx + 1] = b;
    setTodo([...todos]);
  };

  const addTodo = (title, completed) => {
    setTodo([{ title: title, completed: completed }, ...todos]);
  };

  const HandleInput = (event) => {
    if (event.key == "Enter") {
      if (event.target.value === "") {
        alert("Todo canot be empty");
        return;
      }
      addTodo(event.target.value, false);
      event.target.value = "";
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={HandleInput}
        />
        {todos.map((ele, index) => (
          <Todo
            key={index}
            title={ele.title}
            completed={ele.completed}
            onMark={() => markTodo(index)}
            onDelete={() => deleteTodo(index)}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
          />
        ))}
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((ele) => ele.completed == false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((ele) => ele.completed == true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Piyaphat Khaosaeng 640610651
        </p>
      </div>
    </div>
  );
}
