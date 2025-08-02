const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect('mongodb://127.0.0.1:27017/todo-app')
.then(() => console.log('✅ Connected to local MongoDB!'))
.catch(err => console.error('❌ Connection failed:', err.message));
