import './Todo.css';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function TodoList({ 
  todos, 
  onDelete, 
  onToggle, 
  onEdit,
  editingId,
  setEditingId
}) {
  const [editText, setEditText] = useState('');
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const handleSave = (id) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditText('');
      setEditingId(null);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') handleSave(id);
    if (e.key === 'Escape') setEditingId(null);
  };

  return (
    <ul className="todo-list portfolio-grade">
      {todos.map(todo => (
        <li 
          key={todo._id}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
        >
          {editingId === todo._id ? (
            <div className="edit-mode">
              <div className="input-group">
                <input
                  ref={editInputRef}
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo._id)}
                  className="form-input"
                  placeholder="Update task..."
                />
                <button 
                  onClick={() => handleSave(todo._id)}
                  disabled={!editText.trim()}
                  className="form-button save"
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  className="form-button cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="view-mode">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo._id)}
                />
                <span className="checkmark"></span>
              </label>
              <span className="todo-text styled-text">{todo.text}</span>
              <div className="actions">
                <button 
                  onClick={() => handleEdit(todo)}
                  className="edit-btn icon-btn"
                  aria-label="Edit"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(todo._id)}
                  className="delete-btn icon-btn"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingId: PropTypes.string,
  setEditingId: PropTypes.func.isRequired
};
