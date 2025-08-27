import React, { useState, useCallback } from "react";

// Memoized component for performance
const Todo = React.memo(function Todo({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const saveEdit = useCallback(async () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== todo.title) {
      await editTodo(todo.id, trimmed);
    }
    setIsEditing(false);
    setTitle(todo.title);
  }, [title, todo.id, todo.title, editTodo]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setTitle(todo.title);
  }, [todo.title]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") saveEdit();
      if (e.key === "Escape") cancelEdit();
    },
    [saveEdit, cancelEdit]
  );

  const handleDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await deleteTodo(todo.id);
    }
  }, [deleteTodo, todo.id]);

  const handleToggle = useCallback(() => toggleTodo(todo.id), [toggleTodo, todo.id]);

  return (
    <li
      style={{
        ...styles.li,
        backgroundColor: todo.completed ? "#d4edda" : "#fff3cd",
      }}
    >
      <div style={styles.todoContent}>
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          style={styles.checkbox}
        />
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            style={{
              ...styles.title,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#155724" : "#856404",
            }}
          >
            {todo.title}
          </label>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button
          onClick={isEditing ? saveEdit : () => setIsEditing(true)}
          style={{ ...styles.button, backgroundColor: "#28a745", color: "#fff" }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={cancelEdit} style={{ ...styles.button, backgroundColor: "#dc3545", color: "#fff" }}>
            Cancel
          </button>
        )}
        <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: "#e83e8c", color: "#fff" }}>
          ❌
        </button>
      </div>
    </li>
  );
});

export default Todo;

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    margin: "8px 0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s, transform 0.2s",
  },
  todoContent: { display: "flex", alignItems: "center", flex: 1 },
  checkbox: { width: "18px", height: "18px" },
  title: { marginLeft: "12px", cursor: "pointer", flex: 1, fontWeight: 500, fontSize: "1rem" },
  input: { marginLeft: "12px", flex: 1, padding: "6px 8px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem" },
  buttonGroup: { display: "flex", alignItems: "center" },
  button: {
    marginLeft: "6px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "opacity 0.2s, transform 0.2s",
  },
};
