const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config()



// CONNECT SUPABASE 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());


// FETCH API SUPABASE 
app.get('/todos', async (req, res) => {
    const { data, error } = await supabase
        .from('todolist')
        .select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});


// ADD TODOS
app.post('/todos', async (req, res) => {
    const { description } = req.body;
    const { data, error } = await supabase.from('todolist').insert([{ description }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const updatedTodos = await supabase.from('todolist').select('*');
    res.status(201).json({ message: 'Todo added successfully', todos: updatedTodos.data });
});

// DELETE TODOS
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await supabase.from('todolist').delete().eq('id', id);

        const { data: todos, error } = await supabase.from('todolist').select('*');
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(todos);
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});



// EXPRESS PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




