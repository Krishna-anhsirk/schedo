import { useEffect, useState } from "react";
import styled from "styled-components";

// Style later
const Todo = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 70%;
`;

function TodoList({ todos }) {
  // Extract only till date
  const [dueDate, setDueData] = useState(new Date().toISOString());
  console.log(dueDate);
  const filteredTodos = todos.filter((todo) => {
    const todoDueDate = todo.date_created.slice(0, 10);
    return todoDueDate === dueDate.slice(0, 10);
  });

  console.log(filteredTodos);
  const todo = todos[0];
  console.log(todo);
  // Loader and all
  return (
    <div>
      <button
        onClick={() => {
          const currentDate = new Date(dueDate);
          currentDate.setDate(currentDate.getDate() - 1);
          const prevDate = currentDate.toISOString();
          setDueData(prevDate);
        }}
      >
        {" "}
        &lt;&lt; Prev{" "}
      </button>
      <button
        onClick={() => {
          const currentDate = new Date().toISOString();
          setDueData(currentDate);
        }}
      >
        Today
      </button>
      <button
        onClick={() => {
          const currentDate = new Date(dueDate);
          currentDate.setDate(currentDate.getDate() + 1);
          const nextDate = currentDate.toISOString();
          setDueData(nextDate);
        }}
      >
        Next &gt;&gt;
      </button>

      {filteredTodos.map((todo) => (
        <Todo key={todo.id}>
          <h2>{todo.title}</h2>
          <h4>{todo.description}</h4>
          <b>{todo.date_created.slice(0, 10)}</b>
        </Todo>
      ))}
    </div>
  );
}

export default TodoList;
