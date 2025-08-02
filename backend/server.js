
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const PORT = 5000

app.use(cors())
app.use(express.json())

// let todos = []
connectDB();

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// app.get('/api/todos', (req,res) => {
//     res.json(todos)
// })
// app.get('/api/todos/:id', (req,res) => {
//     const id = Number(req.params.id)
//     const todo = todos.find(todo => todo.id === id)
//     if(!todo) res.status(400).json({error: 'todo not found', todo})
//     res.json(todo)
// })

// app.post('/api/todos', (req,res) => {
//     console.log(req.body);
//     const {id,text,isComplete} = req.body
//     const newTodo = {id,text,isComplete}
//     todos.push(newTodo)
//     // if (!text) return res.status(400).json({error: 'text is required'})
//     res.status(201).json({Message : 'Todo Added Success', newTodo})
// })


// app.delete('/api/todos/:id', (req,res) => {
//     const id = Number(req.params.id)
//     todos = todos.filter(todo => todo.id != id)
//     res.json({message: 'deleted todo', id})
// })


// app.put('/api/todos/:id', (req,res) => {
//     const id = Number(req.params.id)
//     const {text, isComplete} = req.body
//     const index = todos.findIndex(todo => todo.id === id)

//     if (index === -1) res.status(400).json({message: 'todo not found'})

//     todos[index] = {
//         ...todos[index],
//         text: text ?? todos[index].text,
//         isComplete: isComplete ?? todos[index].isComplete
//     }

//     res.json({message: 'todo updated', todo: todos[index]})
// })

// console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))