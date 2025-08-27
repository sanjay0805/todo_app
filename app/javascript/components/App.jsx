import React, { useState, useEffect, useCallback } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;

    try {
      const res = await fetch("/api/v1/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: { title: trimmed, completed: false } }),
      });
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = useCallback(async (id, completed) => {
    try {
      const res = await fetch(`/api/v1/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: { completed: !completed } }),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await fetch(`/api/v1/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const editTodo = useCallback(async (id, title) => {
    try {
      const res = await fetch(`/api/v1/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: { title } }),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div style={styles.appBackground}>
      <div style={styles.container}>
        <h1 style={styles.header}>Todo App</h1>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>Add</button>
        </form>

        <ul style={styles.list}>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={() => toggleTodo(todo.id, todo.completed)}
              deleteTodo={() => deleteTodo(todo.id)}
              editTodo={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  appBackground: {
    minHeight: "100vh",
    margin: 0,
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", // soft gradient background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "2rem",
    maxWidth: "400px",
    width: "100%",
    background: "#ffeeba",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#856404",
  },
  form: {
    display: "flex",
    marginBottom: "1rem",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "8px 12px",
    marginLeft: "8px",
    borderRadius: "5px",
    border: "none",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};
