const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Todo', TodoSchema);