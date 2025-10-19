const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend requests

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the File-based Express API Server!");
});

// API root
app.get("/api", (req, res) => {
  res.send("Welcome to the API! Use /api/users to see users.");
});

// Helper functions
function readUsers() {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function writeUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

// GET all users
app.get("/api/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST new user -
// =================================================================
// THIS IS THE CORRECTED LOGIC
// =================================================================
app.post("/api/users", (req, res) => {
  const users = readUsers();

  // Find the highest existing ID, or start at 0 if no users exist
  const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;

  const newUser = {
    id: maxId + 1, // New ID is always the highest ID + 1
    name: req.body.name,
    city: req.body.city,
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/api/users/:id", (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  users[userIndex].name = req.body.name || users[userIndex].name;
  users[userIndex].city = req.body.city || users[userIndex].city;

  writeUsers(users);
  res.json(users[userIndex]);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  let users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(userIndex, 1)[0];
  writeUsers(users);
  res.json(deletedUser);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 File-based server running on http://localhost:${PORT}`);
});
