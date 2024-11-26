import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, deleteUser } from "../services/MockApi";
import './mangament.css'

const UsersManagment = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", status: "Active" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      
    }
    if (!form.role.trim()) {
      newErrors.role = "Role is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    if (validateForm()) {
      addUser(form).then(() => {
        fetchUsers().then(setUsers);
        setForm({ name: "", role: "", status: "Active" });
        setErrors({});
      });
    }
  };

  const handleDeleteUser = (id) => {
    console.log("Deleting user with ID:", id); // Debugging log
    deleteUser(id)
      .then(() => {
        // Immediately update the state to remove the deleted user from the UI
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err)); // Catch errors for debugging
  };
  
  

  const handleInputChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
    // Clear the specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="form-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => handleInputChange(e, 'role')}
          />
          {errors.role && <span className="error">{errors.role}</span>}
        </div>
        
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        
        <button 
          onClick={handleAddUser}
          disabled={!form.name.trim() || !form.role.trim()}
        >
          Add User
        </button>
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