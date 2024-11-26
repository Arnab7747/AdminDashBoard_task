import React, { useState, useEffect } from "react";
import { fetchRoles, updateRolePermissions } from "../services/MockApi";
import './permission.css';

const PermissionManagment = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState("");
  const [availablePermissions] = useState(["Read", "Write", "Delete", "Execute"]); 

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleSelectRole = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setSelectedRole(role);
    setPermissions(role.permissions.join(", "));
  };

  const handleUpdatePermissions = () => {
    if (selectedRole) {
      const updatedPermissions = permissions.split(",").map((p) => p.trim());
      updateRolePermissions(selectedRole.id, updatedPermissions).then(() => {
        fetchRoles().then(setRoles);
        alert("Permissions updated successfully!");
        setSelectedRole(null);
        setPermissions("");
      });
    }
  };

  return (
    <div className="permission-management">
      <h2>Permission Management</h2>
      <div>
        <label htmlFor="role-select">Select Role:</label>
        <select
          id="role-select"
          onChange={(e) => handleSelectRole(parseInt(e.target.value))}
        >
          <option value="">--Select a Role--</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div className="permissions-editor">
          <h3>Editing Permissions for: {selectedRole.name}</h3>
          <label htmlFor="permissions">
            Permissions (comma-separated, e.g., Read, Write):
          </label>
          <input
            type="text"
            id="permissions"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          />
          <button onClick={handleUpdatePermissions}>Update Permissions</button>
        </div>
      )}

      <div className="available-permissions">
        <h3>Available Permissions:</h3>
        <ul>
          {availablePermissions.map((perm) => (
            <li key={perm}>{perm}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PermissionManagment;
