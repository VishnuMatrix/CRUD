import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css"; // Global styles for container & body

const API = "http://localhost:3000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      await axios.post(API, user);
      fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      await axios.put(`${API}/${id}`, user);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="container">
      <h1>User Management CRUD App</h1>
      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />
      <UserList
        users={users}
        setEditingUser={setEditingUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
