// src/App.jsx
import React, { useState, useEffect } from "react";
import API from "./api"; // axios instance with cleaned baseURL
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css"; // Global styles

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users"); // single leading slash
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async (user) => {
    try {
      await API.post("/api/users", user);
      fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  // Update an existing user
  const updateUser = async (id, user) => {
    try {
      await API.put(`/api/users/${id}`, user);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await API.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container">
      <h1>User Management CRUD App</h1>

      {/* Form to add or edit users */}
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />

      {/* List of users */}
      <UserList
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
