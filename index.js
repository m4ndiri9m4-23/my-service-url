const express = require('express');
const app = express();

// Use the port Render assigns, or default to 3000 for local testing
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data sent to your API
app.use(express.json());

// A basic "Home" route
app.get('/', (req, res) => {
  res.json({
    message: "Your backend service is LIVE!",
    status: "Active",
    timestamp: new Date().toISOString()
  });
});

// An example API endpoint for your app to fetch data
app.get('/api/data', (req, res) => {
  res.json({
    items: [
      { id: 1, name: "Sample Item A" },
      { id: 2, name: "Sample Item B" }
    ]
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});