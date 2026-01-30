require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js'); // New Library
const app = express();
const path = require('path');

app.use(express.static(path.join(--dirname, 'public')));
app.use(express.json());
app.use(express.static('public'));

// Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// LOGIN API using Supabase
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});    
    
    // Query the "users" table in Supabase
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

    if (data) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// ADMIN API: Add employee to Supabase
app.post('/api/employees', async (req, res) => {
    const { name } = req.body;
    const { data, error } = await supabase
        .from('employees')
        .insert([{ name, status: 'Active' }]);
    
    res.json(data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running with Supabase on ${PORT}`));