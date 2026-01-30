require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
// This line tells Express to serve your HTML files from the "public" folder
app.use(express.static('public'));

// Mock Database (In-memory)
let employees = [
  { id: 1, name: "Admin User", status: "Active" }
];

// 1. GET all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// 2. ADD employee
app.post('/api/employees', (req, res) => {
  const newEmployee = { id: Date.now(), name: req.body.name, status: "Active" };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// 3. SUSPEND employee
app.patch('/api/employees/:id/suspend', (req, res) => {
  const emp = employees.find(e => e.id === parseInt(req.params.id));
  if (emp) emp.status = emp.status === "Suspended" ? "Active" : "Suspended";
  res.json(emp);
});

// 4. DELETE employee
app.delete('/api/employees/:id', (req, res) => {
  employees = employees.filter(e => e.id !== parseInt(req.params.id));
  res.send({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));