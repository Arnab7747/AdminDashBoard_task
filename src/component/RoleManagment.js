import React, { useState, useEffect } from "react";
import './role.css';
import {
    fetchRoles,
    addRole, 
    updateRole,
    
  } from "../services/MockApi";
  

const RoleManagment = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: "", attributes: "" });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleCreateRole = () => {
    const roleData = {
      ...newRole,
      permissions: newRole.permissions.split(",").map((p) => p.trim()),
      attributes: newRole.attributes.split(",").map((a) => a.trim()),
    };
    addRole({ name: "New Role", permissions: ["Read", "Write"] })
  .then((message) => console.log(message))
  .catch((err) => console.error(err));

  };

  const handleUpdateRole = () => {
    if (editingRole) {
      const updatedData = {
        ...editingRole,
        permissions: editingRole.permissions.split(",").map((p) => p.trim()),
        attributes: editingRole.attributes.split(",").map((a) => a.trim()),
      };
      updateRole(editingRole.id, updatedData).then(() => {
        fetchRoles().then(setRoles);
        alert("Role updated successfully!");
        setEditingRole(null);
      });
    }
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      <div className="role-creation">
        <h3>Create New Role</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={newRole.permissions}
          onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
        />
        <input
          type="text"
          placeholder="Attributes (comma-separated)"
          value={newRole.attributes}
          onChange={(e) => setNewRole({ ...newRole, attributes: e.target.value })}
        />
        <button onClick={handleCreateRole}>Create Role</button>
      </div>

      <div className="role-editing">
        <h3>Edit Existing Roles</h3>
        {roles.map((role) => (
  <div key={role.id}>
    {role.name} - {Array.isArray(role.permissions) ? role.permissions.join(", ") : "No permissions"}
  </div>
))
}
      </div>

      {editingRole && (
        <div className="edit-form">
          <h3>Edit Role: {editingRole.name}</h3>
          <input
            type="text"
            placeholder="Role Name"
            value={editingRole.name}
            onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Permissions (comma-separated)"
            value={editingRole.permissions}
            onChange={(e) => setEditingRole({ ...editingRole, permissions: e.target.value })}
          />
          <input
            type="text"
            placeholder="Attributes (comma-separated)"
            value={editingRole.attributes}
            onChange={(e) => setEditingRole({ ...editingRole, attributes: e.target.value })}
          />
          <button onClick={handleUpdateRole}>Update Role</button>
          <button onClick={() => setEditingRole(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RoleManagment;
