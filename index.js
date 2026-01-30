require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect to Supabase using variables from Render Environment
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// LOGIN API: Checks the 'users' table in Supabase
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

    if (data) {
        res.json({ success: true, message: "Login successful!", role: data.role });
    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }
});

// ADMIN API: Get all employees
app.get('/api/employees', async (req, res) => {
    const { data } = await supabase.from('employees').select('*');
    res.json(data || []);
});

// ADMIN API: Create a new user account (Employee access)
app.post('/api/admin/create-user', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, role: 'employee' }]);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "User created successfully!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server live on ${PORT}`));