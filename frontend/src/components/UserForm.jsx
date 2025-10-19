import React, { useState, useEffect } from "react";
import "./UserForm.css"; // Import the dedicated CSS file

const UserForm = ({ addUser, editingUser, updateUser }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setCity(editingUser.city);
    } else {
      setName("");
      setCity("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !city) return;

    if (editingUser) {
      updateUser(editingUser.id, { ...editingUser, name, city });
    } else {
      addUser({ name, city });
    }
    setName("");
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        className="form-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-input"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="submit" className="form-button">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
