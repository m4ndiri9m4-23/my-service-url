require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Easier than MongoClient for apps
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));

// This part replaces your "run()" function and keeps the connection alive
const uri = process.env.DATABASE_URL; 

mongoose.connect(uri)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.error("Connection error:", err));

// Create the "Employee" model for the database
const Employee = mongoose.model('Employee', {
  name: String,
  status: { type: String, default: "Active" }
});

// GET all employees from MongoDB
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// SAVE a new employee to MongoDB
app.post('/api/employees', async (req, res) => {
  const newEmp = new Employee({ name: req.body.name });
  await newEmp.save();
  res.json(newEmp);
});

// DELETE an employee from MongoDB
app.delete('/api/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));