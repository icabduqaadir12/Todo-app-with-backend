import { useCallback, useEffect, useState } from 'react';
import {TodoForm} from './components/TodoForm'
// import {TodoList} from './components/day-7/TodoList'
import TodoList from './components/TodoList'

function App() {
  const [todos,setTodos] = useState([])
useEffect(() => {
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/api/todos')
    const data = await res.json()
    setTodos(data)
  } 
  fetchTodos()
}, [])

const addTodo = async (newItem) => {
  const res = await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  const data = await res.json()
  console.log(data);
  
  setTodos(prev => [...prev, data])
}


  async function deleteTodo(id) {
        const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: 'DELETE',
        })

        if(res.ok) setTodos(todos.filter(todo => todo._id !== id))
    }

      
    const toggleComplete = async (id) =>  {
      const todo = todos.find(todo => todo._id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };

      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: updatedTodo.completed })
      });

      if (res.ok) {
        const data = await res.json();
        setTodos(todos.map(todo =>
          todo._id === id ? data : todo
        ));
      }
    };


  

  const [editingId, setEditinId] = useState(null)

  async function updateTodo(id, newTodo) {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({text: newTodo})
    });

    if (res.ok) {
      const updated = await res.json()
      setTodos(prev =>
        prev.map(todo => (
          todo._id === id ? updated : todo
        ))
      )
    }
  }

  return (
    <div className='App'>
      <h1>Todo App (Gbw)</h1>
      <TodoForm addTodo={addTodo}/>
      <TodoList editingId={editingId} setEditingId={setEditinId} onEdit={updateTodo} onToggle={toggleComplete} onDelete={deleteTodo} todos={todos}/>
    </div>
  )
}

export default App;

