require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect to your MongoDB Atlas URL from Render Environment Variables
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// USER MODEL (Only Admin can create these via the Admin Panel)
const User = mongoose.model('User', {
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // For learning, using plain text
  role: { type: String, default: 'employee' }
});

// --- LOGIN API ---
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Search database for a user with matching username AND password
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ 
        success: true, 
        message: "Login successful!", 
        role: user.role 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Invalid username or password." 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- ADMIN API: CREATE ACCOUNT ---
app.post('/api/admin/create-user', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created by Admin!" });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));