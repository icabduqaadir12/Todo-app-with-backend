const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET all todos (with mongoDb)
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new todo
// router.post('/', async (req,res) => {
//     try {
//         if (!req.body.text) {
//             return res.status(400).json({ error: 'Text is required'});
//         }
//         const newTodo = new Todo({ text: req.body.text, completed: false });
//         const savedTodo = await newTodo.save();
//         res.status(201).json(savedTodo);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create Todo' });
//     }
// });

router.post('/', async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body); // ✅ Log the incoming data

        if (!req.body.text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const newTodo = new Todo({
            text: req.body.text,
            completed: false
        });

        const savedTodo = await newTodo.save(); // Use await
        console.log("✅ Todo saved:", savedTodo); // ✅ Log saved result

        res.status(201).json(savedTodo);
    } catch (error) {
        console.error("❌ Error in POST /api/todos:", error); // ✅ Log real error
        res.status(500).json({ error: 'Failed to create Todo' });
    }
});


router.put('/:id', async ( req,res ) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
        );
        
        if (!updatedTodo) {
            return res.status(404).json( { error: 'Todo not found' } );
        }

        res.json(updatedTodo);

    } catch (error) {
        res.status(500).json( {error: 'update failed' } );
    }
});


router.delete('/:id', async (req,res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo Deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Deleting failed'});
    }
});




module.exports = router;