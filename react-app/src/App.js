import { useCallback, useEffect, useState } from 'react';
import {TodoForm} from './components/day-7/TodoForm'
// import {TodoList} from './components/day-7/TodoList'
import TodoList from './components/day-7/TodoList'

function App() {
  const [todos,setTodos] = useState([])
//   const STORAGE_VERSION = 'todos-v1'
//   localStorage.getItem(STORAGE_VERSION)

//   const [todos, setTodos] = useState(() => {
//   const saved = localStorage.getItem('todos')
//   return saved ? JSON.parse(saved) : []
// })

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


  // const addTodo = useCallback((text) => {
  //   setTodos(prev => [...prev, {id: Date.now(), completed: false, text}])
  // }, [])


  // useEffect(() => {
  //   const savedTodos = localStorage.getItem('todos');
  //   if (savedTodos) setTodos(JSON.parse(savedTodos));
  // }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     localStorage.setItem('todos', JSON.stringify(todos))
  //   }, 500)
  //   return () => clearTimeout(timer);
  // }, [todos])

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
  
  // function updateTodo(id, newText) {
  //   setTodos(todos.map(todo => todo.id === id ? {...todo, text: newText} : todo
  //   ))

  //   setEditinId(null)
  // }

  return (
    <div className='App'>
      <h1>Todo App (Day 7)</h1>
      <TodoForm addTodo={addTodo}/>
      <TodoList editingId={editingId} setEditingId={setEditinId} onEdit={updateTodo} onToggle={toggleComplete} onDelete={deleteTodo} todos={todos}/>
    </div>
  )
}

export default App;

