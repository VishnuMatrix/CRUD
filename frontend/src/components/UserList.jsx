import React from "react";
import "./UserList.css"; // Import the dedicated CSS file

const UserList = ({ users, setEditingUser, deleteUser }) => {
  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.city}</td>
                <td className="actions-cell">
                  <button
                    className="action-button edit-button"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-users-cell">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
