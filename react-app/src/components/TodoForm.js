import { useEffect, useRef, useState } from "react";
import './Todo.css';

export function TodoForm({ addTodo }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus();
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("⚠ Task cannot be empty");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      isComplete: false
    }

    addTodo(newTodo);
    setInput("");
    setError("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError(""); // Clear error as user types
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Add a task..."
          className={`form-input ${error ? 'input-error' : ''}`}
        />
        <button className="form-button" type="submit">Add</button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
