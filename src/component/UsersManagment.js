import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../services/MockApi";
import './mangament.css'

const UsersManagment = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", status: "Active" });

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    addUser(form).then(() => {
      fetchUsers().then(setUsers);
      setForm({ name: "", role: "", status: "Active" });
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => fetchUsers().then(setUsers));
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagment;
